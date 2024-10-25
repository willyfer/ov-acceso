export default function({ store, redirect }) {
  if (!store.state.users.promotor.state) {
    return redirect('/promotor')
  }
}
