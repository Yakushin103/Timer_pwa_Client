import createRouter from "router5";
import browserPlugin from "router5-plugin-browser";

const router = createRouter(
  [
    {
      name: "home",
      path: "/",
    },
    {
      name: "reports",
      path: "/reports",
    },
    {
      name: "settings",
      path: "/settings",
    },
    {
      name: "admin",
      path: "/admin",
    },
  ],
  {
    defaultRoute: "home",
  }
);

router.usePlugin(browserPlugin());

router.useMiddleware(() => (fromState, toState, done) => {
  if (!fromState || !toState) return done();

  if (fromState.name !== toState.name) window.scrollTo(0, 0);

  done();
});

export default router;
