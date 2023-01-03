import { FerramentasDaListagem } from '../../shared/components';
import { FerramentasDeDetalhe } from '../../shared/components/ferramentas-de-detalhe/FerramentasDeDetalhe';
import { LayoutBaseDePagina } from '../../shared/layouts';

 interface ILayoutBasePagina {
        title: string;
}

export const Dashboard = ({title}: ILayoutBasePagina) => {

  return (
    <LayoutBaseDePagina 
      title={title}
      barraDeFerramentas={(
        <FerramentasDeDetalhe mostrarBotaoSalvarEFechar mostrarBotaoNovo />
      )} >
      Testando
    </LayoutBaseDePagina>
  );
};