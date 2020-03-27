import React, {useState} from 'react'
import { useForm } from 'react-hook-form'
import { createLogEntry } from './API'

const LogEntryForm = ({location, onClose}) => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const { register, handleSubmit } = useForm()

    const onSubmit = async (data) => {
        try {
            setLoading(true)
            data.latitude = location.latitude
            data.longitude = location.longitude
            const created = await createLogEntry(data)
            // console.log(created)
            onClose()
        } catch (error) {
            console.log(error)
            setError(error.message)
            setLoading(false)
        }
        
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="entry_form">
            {error ? <h3 className="error">{error}</h3> : null}
            <input name="title" type="text" placeholder="Title Here" required ref={register} />
            <textarea name="comments" placeholder="Comments Here" required ref={register}></textarea>
            <textarea name="description" placeholder="Description Here" ref={register}></textarea> 
            <input name="image" type="text" placeholder="Image Url"  required ref={register} /> 
            <input name="visitDate" type="date" placeholder="Visit Date Here" required ref={register} />
            <button type="submit" disabled={loading}>{loading ? 'Loading...' : 'Create Entry'}</button>
        </form>
    )
}

export default LogEntryForm