import { DeleteOrganism }    from '../../src/UI/components/forms/Delete.organism'
import { ScreenComposition } from '../../src/UI/compositions/Screen.composition'




export default function screen() {

  return <ScreenComposition title={'Delete any user'}>

    <DeleteOrganism/>

  </ScreenComposition>
}
