"use client";

import Image from "next/image";
import { BarbershopService, Barbershop } from "@/generated/prisma/client";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Calendar } from "./ui/calendar";
import { Separator } from "./ui/separator";
import { useState } from "react";
import { ptBR } from "date-fns/locale";
import { useAction } from "next-safe-action/hooks";
import { createBooking } from "../_actions/create-booking";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";
import { getDateAvailableTimeSlots } from "../_actions/get-date-available-time-slots";
import { createBookingCheckoutSession } from "../_actions/create-booking-checkout-session";
import { loadStripe } from "@stripe/stripe-js";

interface ServiceItemProps {
  service: BarbershopService & {
    barbershop: Barbershop;
  };
}

export function ServiceItem({ service }: ServiceItemProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedTime, setSelectedTime] = useState<string | undefined>();
  const { executeAsync, isPending } = useAction(createBooking);
  const { executeAsync: executeCreateBookingCheckoutSession } = useAction(
    createBookingCheckoutSession,
  );
  const [sheetIsOpen, setSheetIsOpen] = useState(false);
  const { data: availableTimeSlots } = useQuery({
    queryKey: ["date-available-time-slots", service.barbershopId, selectedDate],
    queryFn: () =>
      getDateAvailableTimeSlots({
        barbershopId: service.barbershopId,
        date: selectedDate!,
      }),
    enabled: Boolean(selectedDate),
  });

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
  };

  const priceInReais = (service.priceInCents / 100).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  const priceInReaisInteger = Math.floor(service.priceInCents / 100);

  const formattedDate = selectedDate
    ? selectedDate.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "short",
      })
    : "";

  const isConfirmDisabled = !selectedDate || !selectedTime;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const handleConfirm = async () => {
    if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
      toast.error("Erro ao criar checkout session");
      return;
    }
    if (!selectedTime || !selectedDate) {
      return;
    }
    const timeSplitted = selectedTime.split(":"); // [10, 00]
    const hours = timeSplitted[0];
    const minutes = timeSplitted[1];
    const date = new Date(selectedDate);
    date.setHours(Number(hours), Number(minutes));
    const checkoutSessionResult = await executeCreateBookingCheckoutSession({
      serviceId: service.id,
      date,
    });
    if (
      checkoutSessionResult.serverError ||
      checkoutSessionResult.validationErrors
    ) {
      toast.error(checkoutSessionResult.validationErrors?._errors?.[0]);
      return;
    }
    const stripe = await loadStripe(
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
    );
    if (!stripe || !checkoutSessionResult.data?.id) {
      toast.error("Erro ao carregar Stripe");
      return;
    }
    await stripe.redirectToCheckout({
      sessionId: checkoutSessionResult.data.id,
    });
    // // 10:00
    // if (!selectedTime || !selectedDate) {
    //   return;
    // }

    // const result = await executeAsync({
    //   serviceId: service.id,
    //   date,
    // });
    // if (result.serverError || result.validationErrors) {
    //   toast.error(result.validationErrors?._errors?.[0]);
    //   return;
    // }
    // toast.success("Agendamento criado com sucesso!");
    // setSelectedDate(undefined);
    // setSelectedTime(undefined);
    // setSheetIsOpen(false);
  };

  return (
    <Sheet open={sheetIsOpen} onOpenChange={setSheetIsOpen}>
      <div className="border-border bg-card flex items-center justify-center gap-3 rounded-2xl border border-solid p-3">
        <div className="relative size-[110px] shrink-0 overflow-hidden rounded-[10px]">
          <Image
            src={service.imageUrl}
            alt={service.name}
            fill
            className="object-cover"
          />
        </div>

        <div className="flex grow basis-0 flex-row items-center self-stretch">
          <div className="relative flex h-full min-h-0 min-w-0 grow basis-0 flex-col items-start justify-between">
            <div className="flex h-[67.5px] w-full flex-col items-start gap-1 text-sm leading-[1.4]">
              <p className="text-card-foreground w-full font-bold">
                {service.name}
              </p>
              <p className="text-muted-foreground w-full font-normal">
                {service.description}
              </p>
            </div>

            <div className="flex w-full items-center justify-between">
              <p className="text-card-foreground text-sm leading-[1.4] font-bold whitespace-pre">
                {priceInReais}
              </p>
              <SheetTrigger asChild>
                <Button className="rounded-full px-4 py-2">Reservar</Button>
              </SheetTrigger>
            </div>
          </div>
        </div>
      </div>

      <SheetContent className="w-[370px] overflow-y-auto p-0">
        <div className="flex h-full flex-col gap-6">
          <SheetHeader className="px-5 pt-6">
            <SheetTitle className="text-lg font-bold">Fazer Reserva</SheetTitle>
          </SheetHeader>

          <div className="flex flex-col gap-4 px-5">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={handleDateSelect}
              disabled={{ before: today }}
              className="w-full p-0"
              locale={ptBR}
            />
          </div>

          {selectedDate && (
            <>
              <Separator />

              <div className="flex gap-3 overflow-x-auto px-5 [&::-webkit-scrollbar]:hidden">
                {availableTimeSlots?.data?.map((time) => (
                  <Button
                    key={time}
                    variant={selectedTime === time ? "default" : "outline"}
                    className="shrink-0 rounded-full px-4 py-2"
                    onClick={() => setSelectedTime(time)}
                  >
                    {time}
                  </Button>
                ))}
              </div>

              <Separator />

              <div className="flex flex-col gap-3 px-5">
                <div className="border-border bg-card flex w-full flex-col gap-3 rounded-[10px] border border-solid p-3">
                  <div className="flex items-center justify-between">
                    <p className="text-card-foreground text-base font-bold">
                      {service.name}
                    </p>
                    <p className="text-card-foreground text-sm font-bold">
                      R${priceInReaisInteger},00
                    </p>
                  </div>

                  <div className="text-muted-foreground flex items-center justify-between text-sm">
                    <p>Data</p>
                    <p>{formattedDate}</p>
                  </div>

                  {selectedTime && (
                    <div className="text-muted-foreground flex items-center justify-between text-sm">
                      <p>Horário</p>
                      <p>{selectedTime}</p>
                    </div>
                  )}

                  <div className="text-muted-foreground flex items-center justify-between text-sm">
                    <p>Barbearia</p>
                    <p>{service.barbershop.name}</p>
                  </div>
                </div>
              </div>

              <div className="px-5 pb-6">
                <Button
                  className="w-full rounded-full"
                  disabled={isConfirmDisabled || isPending}
                  onClick={handleConfirm}
                >
                  Confirmar
                </Button>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
