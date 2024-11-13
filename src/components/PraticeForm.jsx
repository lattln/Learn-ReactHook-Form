import React from 'react'
import { useForm } from 'react-hook-form'
import { DevTool } from '@hookform/devtools'



let renderCount = 0


const PraticeForm = () => {

    const form = useForm({
        // defaultValues: {
        //     //Default values could be useful as default country, checkboxes for subscribe and etc.
        //     username: "Superman",
        //     email: "",
        //     channel: "",
        // }

        //we can turn default values to handle preloaded DATA
        defaultValues: async () => {
            const response = await fetch("https://jsonplaceholder.typicode.com/users/1")
            const data = await response.json()
            return {
                username: "Batman",
                email: data.email,
                //Store as Objects
                social: {
                    twitter: "",
                    facebook: "",
                    youtube: "",
                },
                //Store as array
                phoneNumbers: [
                    "",
                    "",
                ]
            } 
        }
    })
    const { register, control, handleSubmit, formState } = form
    const { errors } = formState;

    const onSubmit = (data) => {
        console.log('Form submitted', data)
    }

    return (
        <div className='flex flex-col items-center'>

            <h1>Practice form Re-Render count {renderCount / 2}</h1>
            <form className='flex flex-col justify-center items-center border rounded-md border-black w-max p-5'
                onSubmit={handleSubmit(onSubmit)} noValidate>

                <label htmlFor='username'
                    className='py-2'>
                    Username
                </label>
                <input type='text'
                    id='username'
                    className='p-2 border border-black rounded-md'
                    {...register('username', {
                        required: {
                            value: true,
                            message: "Username is required"
                        }
                    }
                    )}>
                </input>
                <p className='text-red-500'>{errors.username?.message}</p>


                <label htmlFor='email'
                    className='py-2'>
                    Email
                </label>
                <input type='email'
                    id='email'
                    className='p-2 border border-stone-500 rounded-md'
                    {...register('email', {
                        pattern: {
                            value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                            message: 'Invalid email format'
                        },
                        // validate: (fieldValue) => {
                        //     return (
                        //         fieldValue !== 'admin@example.com' ||
                        //         'Enter a different email address'
                        //     )
                        // }

                        //Able to have multiple validation.
                        validate: {
                            notAdmin: (fieldValue) => {
                                return (
                                    fieldValue !== 'admin@example.com' ||
                                    'enter a different emaill address'
                                )
                            },
                            notBlackListed: (fieldValue) => {
                                return !fieldValue.endsWith('baddomain.com') ||
                                'domain not supported'
                            }
                        },

                    }
                    )} >
                </input>
                <p className='text-red-500'>{errors.email?.message}</p>

                <label htmlFor='twitter'
                    className='py-2'>
                    Twitter
                </label>
                <input type='text'
                    id='twitter'
                    className='p-2 border border-stone-500 rounded-md'
                    {...register('social.twitter',)} >
                </input>

                <label htmlFor='facebook'
                    className='py-2'>
                    Facebook
                </label>
                <input type='text'
                    id='facebook'
                    className='p-2 border border-stone-500 rounded-md'
                    {...register('social.facebook',)} >
                </input>

                <label htmlFor='youtube'
                    className='py-2'>
                    Youtube
                </label>
                <input type='text'
                    id='youtube'
                    className='p-2 border border-stone-500 rounded-md'
                    {...register('social.youtube',)} >
                </input>

                <label htmlFor='primary-phone'
                    className='py-2'>
                    primary-phone
                </label>
                <input type='text'
                    id='primary-phone'
                    className='p-2 border border-stone-500 rounded-md'
                    {...register('phoneNumbers[0]',)} >
                </input>

                <label htmlFor='secondary-phone'
                    className='py-2'>
                    primary-phone
                </label>
                <input type='text'
                    id='secondary-phone'
                    className='p-2 border border-stone-500 rounded-md'
                    {...register('phoneNumbers[1]',)} >
                </input>
                



                <button className='mt-5 p-2 border rounded-md border-black'>
                    Submit
                </button>
            </form>

            {/*Connects dev tool with form with control.*/}
            <DevTool control={control} />

        </div>
    )
}

export default PraticeForm