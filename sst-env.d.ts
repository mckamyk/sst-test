/* tslint:disable */
/* eslint-disable */
import "sst"
declare module "sst" {
  export interface Resource {
    "MyWeb": {
      "type": "sst.aws.Remix"
      "url": string
    }
    "NeonDB": {
      "type": "sst.sst.Secret"
      "value": string
    }
  }
}
export {}
