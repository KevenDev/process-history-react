import format from "date-fns/format"
import ptBR from "date-fns/locale/pt-BR"

export const Header = () => {
  const currentDate = format(new Date(), 'EEEEEE, d MMMM', {
    locale: ptBR,
  })

  return (
    <>
      <header className="bg-[#005EB8] h-20 flex justify-between items-center py-2 px-4 border-solid">
        <img className="mx-auto md:mx-0 w-50 h-20" src="data:image/png;base64,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" alt="Logo Sebrae" />
        <h2 className="md:flex ml-8 pl-8 py-1 border-l-2 border-solid text-center text-white">Consulte sua solicitação de Patrocínio</h2>
        <span className="hidden md:flex ml-auto capitalize text-white">{currentDate}</span>
      </header>
    </>
  )

}
