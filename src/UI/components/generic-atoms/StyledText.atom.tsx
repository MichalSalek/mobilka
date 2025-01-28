import { TextAtom, TextAtomProps } from './Text.atom'




export const MonoTextAtom = (props: TextAtomProps) => {
  return <TextAtom {...props} style={[ props.style, {fontFamily: 'SpaceMono'} ]}/>
}
