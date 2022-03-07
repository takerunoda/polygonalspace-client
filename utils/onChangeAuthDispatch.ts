import { FormEvent } from 'react'

interface FunctionProps {
                inputState : any
                inputDispatch : any
            }

export const onChangeAuthDispatch = (e: FormEvent<HTMLInputElement>, {inputDispatch} : FunctionProps) => {
        inputDispatch({type: [(e.target as HTMLTextAreaElement).name], payload: (e.target as HTMLTextAreaElement).value})
    }