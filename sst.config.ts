/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "sst-test",
      removal: input?.stage === "production" ? "retain" : "remove",
      home: "aws",
      providers: {
        aws: {
          profile: "sst-production",
        },
      },
    };
  },
  async run() {
    const NeonDB = new sst.Secret("NeonDB")
    new sst.aws.SolidStart("TanStack_Start", {
      link: [NeonDB],
    })
   /* new sst.aws.Remix("MyWeb", {
      link: [NeonDB],
    });*/
  },
});
