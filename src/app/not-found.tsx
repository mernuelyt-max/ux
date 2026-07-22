import Link from "next/link";

export default function NotFound() {
  return (
    <section className="container-page grid min-h-[60vh] place-items-center py-20 text-center">
      <div>
        <p className="font-display text-7xl font-extrabold gold-text">404</p>
        <h1 className="mt-4 font-display text-2xl font-extrabold">
          Esta página no cerró
        </h1>
        <p className="mt-3 text-muted">
          El enlace que buscas no existe o cambió de lugar.
        </p>
        <Link href="/" className="btn-primary mt-8">
          Volver al inicio
        </Link>
      </div>
    </section>
  );
}
