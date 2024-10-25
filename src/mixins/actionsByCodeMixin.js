import { actionsByProduct } from '~/enums/actions'

export default {
  methods: {
    analyzeProspectStatus() {
      console.log(this.productCode);
      console.log(this.currentComponent.step)
      const actionsByProspectCode =
        actionsByProduct[this.productCode][this.currentComponent.step]
        console.log("actionsByProspectCode: ", actionsByProspectCode)
        console.log(this.estadoProspecto)
      const action = actionsByProspectCode.find(
        (it) => it.prospectStatus == this.estadoProspecto
      )
      console.log('action', action);
      if (action.shouldGoNextPage) {
        this.$store.commit(`${this.currentComponent.nameSpace}/SET_STEP`, action.nextPage)
      } else if (action.shouldShowModal) {
        console.log('ya debe abrir modeal',action.shouldShowModal)

        this.$emit('open-modal-menssage-prospectus', action)
      }
    },
  },
}
