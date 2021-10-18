export default function ({ store, redirect, route }) {
  // If the user is not authenticated

  if (!store.state.isAuth && route.path !== '/user/register') {
     return redirect('/login')
  }
}
