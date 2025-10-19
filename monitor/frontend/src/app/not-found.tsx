"use client";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-screen bg-gradient-to-b bg-white to-white ">
      <div className="text-9xl font-extrabold text-gray-300 select-none">
        404
      </div>
      <h1 className="mt-4 text-3xl md:text-5xl font-bold text-gray-800 text-center">
        Ops.
        <br />
        Página não encontrada
      </h1>
      <p className="mt-4 text-gray-500 text-center max-w-md">
        Talvez ela tenha sido removida ou o link esteja errado.
      </p>
      <a
        href="/rastro/detalhado"
        className="mt-6 inline-block rounded-lg bg-blue-600 px-6 py-3 text-white font-semibold shadow hover:bg-blue-700 transition"
      >
        Voltar para o início
      </a>
    </div>
  );
}
