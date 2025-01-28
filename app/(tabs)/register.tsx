import { RegisterOrganism }  from '../../src/UI/components/forms/Register.organism'
import { ScreenComposition } from '../../src/UI/compositions/Screen.composition'




export default function screen() {

  return <ScreenComposition title={'Register new user'}>

    <RegisterOrganism/>

  </ScreenComposition>
}
