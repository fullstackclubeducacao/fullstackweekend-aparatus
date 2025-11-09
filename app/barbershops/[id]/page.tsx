import { prisma } from "@/lib/prisma";
import { Button } from "@/app/_components/ui/button";
import { Separator } from "@/app/_components/ui/separator";
import { ServiceItem } from "@/app/_components/service-item";
import { PhoneItem } from "@/app/_components/phone-item";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

const BarbershopPage = async (props: PageProps<"/barbershops/[id]">) => {
  const { id } = await props.params;
  const barbershop = await prisma.barbershop.findUnique({
    where: {
      id,
    },
    include: {
      services: true,
    },
  });

  if (!barbershop) {
    notFound();
  }

  return (
    <div className="flex size-full flex-col items-start overflow-clip">
      {/* Hero Section com Imagem */}
      <div className="relative h-[297px] w-full">
        <div className="absolute top-0 left-0 h-full w-full">
          <Image
            src={barbershop.imageUrl}
            alt={barbershop.name}
            fill
            className="object-cover"
          />
        </div>

        {/* Botão Voltar */}
        <div className="absolute top-0 left-0 flex w-full items-baseline gap-[91px] px-5 pt-6 pb-0">
          <Button
            size="icon"
            variant="secondary"
            className="overflow-clip rounded-full"
            asChild
          >
            <Link href="/">
              <ChevronLeft className="size-5" />
            </Link>
          </Button>
        </div>
      </div>

      {/* Container Principal */}
      <div className="bg-background w-full flex-1 rounded-tl-3xl rounded-tr-3xl">
        {/* Informações da Barbearia */}
        <div className="flex w-full items-center gap-1.5 px-5 pt-6 pb-0">
          <div className="flex flex-col items-start gap-1">
            <div className="flex items-start gap-1.5">
              <div className="relative size-[30px] shrink-0 overflow-hidden rounded-full">
                <Image
                  src={barbershop.imageUrl}
                  alt={barbershop.name}
                  fill
                  className="object-cover"
                />
              </div>
              <p className="text-foreground text-xl font-bold">
                {barbershop.name}
              </p>
            </div>
            <div className="flex flex-col items-start gap-2">
              <div className="flex items-center gap-2">
                <p className="text-muted-foreground text-sm">
                  {barbershop.address}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="px-0 py-6">
          <Separator />
        </div>

        {/* Sobre Nós */}
        <div className="flex w-full flex-col items-start gap-3 px-5 py-0">
          <div className="flex items-center justify-center gap-2.5">
            <p className="text-foreground text-xs font-bold uppercase">
              SOBRE NÓS
            </p>
          </div>
          <p className="text-foreground w-full text-sm">
            {barbershop.description}
          </p>
        </div>

        {/* Divider */}
        <div className="px-0 py-6">
          <Separator />
        </div>

        {/* Serviços */}
        <div className="flex w-full flex-col items-start gap-3 px-5 py-0">
          <div className="flex items-center justify-center gap-2.5">
            <p className="text-foreground text-xs font-bold uppercase">
              SERVIÇOS
            </p>
          </div>
          <div className="flex w-full flex-col gap-3">
            {barbershop.services.map((service) => (
              <ServiceItem
                key={service.id}
                service={{ ...service, barbershop }}
              />
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="px-0 py-6">
          <Separator />
        </div>

        {/* Contato */}
        <div className="flex w-full flex-col items-start gap-3 px-5 py-0">
          <div className="flex items-center justify-center gap-2.5">
            <p className="text-foreground text-xs font-bold uppercase">
              CONTATO
            </p>
          </div>
          <div className="flex w-full flex-col gap-3">
            {barbershop.phones.map((phone, index) => (
              <PhoneItem key={index} phone={phone} />
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="flex w-full flex-col items-center gap-2.5 px-0 pt-[60px] pb-0">
          <div className="bg-secondary flex w-full flex-col items-start justify-center gap-1.5 px-[30px] py-8 text-xs leading-none">
            <p className="text-foreground font-semibold">
              © 2025 Copyright Aparatus
            </p>
            <p className="text-muted-foreground font-normal">
              Todos os direitos reservados.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BarbershopPage;
