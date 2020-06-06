# Projeto-NWL-rockseat
Estudos NWL Rocktseat


para o node ler o TypeScript ele precisa do pacote
 
ts-node 
typescript > esse faz o node entender o TypeScritp junto com ts-node

@types/express > esse vai fazer com q o VS entenda as tipagens para o express diversas outras bibliotecas tbm pediram para importar seu tipo

ts-node-dev > esse serve pra fazer a atualização do servidor assim como o nodemon faz no javascript


a spa é aplicando utilizando a biblioteca react-router-dom
basicamente eu crio um componente de rotas 
e utilizo de dentro do react router dom 
os seguintes componentes nessa sintaxe, definindo assim as rotas da aplicação
depois só usar o componente Link tbm do react router dom para chamar pela rota 
obs > no component router abaixo eu coloco um atributo dizendo qual componente renderizar naquela rota(caminho)
    <BrowserRouter>
            <Route component={Home} path="/" exact />
            <Route component={CreatePoint} path="/cadastra-ponto" />
    </BrowserRouter>

<Link to="/cadastra-ponto">
    chamando a rota criada ao invez de a ou button uso o componente Link
</Link>

o link meio q ja manda o preventDefault do evento de um botao