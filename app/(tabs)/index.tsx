import { LoginOrganism }     from '../../src/UI/components/forms/Login.organism'
import { ScreenComposition } from '../../src/UI/compositions/Screen.composition'




export default function screen() {
  return <ScreenComposition title={'Login to app'}>

    <LoginOrganism/>

  </ScreenComposition>
}
