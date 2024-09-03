/* tslint:disable */
/* eslint-disable */
import "sst"
declare module "sst" {
  export interface Resource {
    "NeonDB": {
      "type": "sst.sst.Secret"
      "value": string
    }
    "TanStack_Start": {
      "type": "sst.aws.SolidStart"
      "url": string
    }
  }
}
export {}
