import { ProductCode } from '~/enums/global-enums';
import { actionsByProspectCodeMoto } from '~/enums/moto-enums';
import { actionsByProspectCodeCelulares } from '~/enums/celulares-enums';
import { actionsByProspectCodeMotoTaxi } from '~/enums/mototaxi-enums';
import { actionsByProspectCodeCompraDeuda } from '~/enums/compra-deuda/actions';
import { actionsByProspectCodeExtraefectivo } from '~/enums/extraefectivo/actions';
import { actionsByProspectCodeMotoNoBancarizados } from '~/enums/moto-no-bancarizados/actions';

export const actionsByProduct = { 
  [ProductCode.MOTO]: actionsByProspectCodeMoto,
  [ProductCode.MOTOTAXI]: actionsByProspectCodeMotoTaxi,
  [ProductCode.COMPRA_DEUDA]: actionsByProspectCodeCompraDeuda,
  [ProductCode.EXTRA_EFECTIVO]: actionsByProspectCodeExtraefectivo,
  [ProductCode.MOTOFURGON]: actionsByProspectCodeMotoTaxi,
  [ProductCode.MOTO_NO_BANCARIADOS]: actionsByProspectCodeMotoNoBancarizados,
  [ProductCode.CELULARES]: actionsByProspectCodeCelulares
};