// importando modulo CSS. No caso do modulo, é necessário nomear o arquivo
import headerModule from './header.module.css'
// O modulo css, vai ser um objeto gerados com as classes como um hash.
// importando a logo: a imagem sera importada como um path, que ja pode ser passado para o src
import igniteLogo from './../../assets/Ignite-logo.svg'

export function Header() {
    return (
        // A passagem deve ser feita a partir do objeto
        <header className={headerModule.header}>
            <img src={igniteLogo} alt="Logotipo do Ignite" />
        </header>
    )
}