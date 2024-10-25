import { pageContigo } from '~/enums/contigo/pages'

export default {
  currentComponent: (state) =>
    pageContigo.find((item) => item.step === state.step),
}
