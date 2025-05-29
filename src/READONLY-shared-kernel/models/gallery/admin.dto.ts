import {IOClientFunctionReqResErr} from '../../application/http/http.client.types'
import {DetailedErrorPayload} from '../../application/http/http.types'


export type GALLERY_DTO_API_V1 = {

  UPLOAD_ASSET: {
    REQUEST: {
      asset_body: ArrayBuffer
    }
    RESPONSE: undefined
    RESPONSE_ERROR: DetailedErrorPayload<GALLERY_DTO_API_V1['UPLOAD_ASSET']['REQUEST']>
    IO_CLIENT_FUNCTION: IOClientFunctionReqResErr<GALLERY_DTO_API_V1['UPLOAD_ASSET']['REQUEST'], GALLERY_DTO_API_V1['UPLOAD_ASSET']['RESPONSE'], GALLERY_DTO_API_V1['UPLOAD_ASSET']['RESPONSE_ERROR']>
  }

}
