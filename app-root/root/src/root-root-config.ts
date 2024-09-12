import {LifeCycles, registerApplication, start} from "single-spa";

registerApplication({
    name: "login",
    app: () => System.import<LifeCycles>("login"),
    activeWhen: (location) => location.pathname.startsWith("/login"),
});

start({
    urlRerouteOnly: true,
});
