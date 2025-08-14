'use client';

import { useState } from 'react';
import { FaUser, FaLock } from 'react-icons/fa';
import TextInput from '../../ui/form/input';
import FormButton from '../../ui/button/FormBtn';
import { useForm } from 'react-hook-form';
import FormWrapper from '../../ui/form/FormWrapper';
import FormError from '../../ui/errors/FormError';
import { useAuth } from '@/app/context/AuthContext';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, loading } = useAuth();
  const [errorMessage, setErrorMessage] = useState('');

  const {
    register,
    handleSubmit,
    formState:{errors}

  } = useForm();
  const onSubmit =async (data) => {
   try {
     await login(data.email, data.password);
   }catch (error) {
    setErrorMessage(error.message);
  }
   
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md  p-8 ">
        
          <FormWrapper onSubmit={handleSubmit(onSubmit)} title='Login to your account'>
          <div>
            <TextInput 
              label="Email"
              name="email"
            //  onChange={(e)=>setEmail(e.target.value)}
              placeholder="Email"
              {
                ...register('email',
                  {
                    required:'Email is required',
                     pattern: {
                      value: /^\S+@\S+$/i,
                      message: 'Invalid email',
                    },
                  }
                )
              }
            />
            {errors.email && <FormError message={errors.email?.message} />}
          </div>

          <div>
          <TextInput 
              label="Password"
              name="password"
             // onChange={(e)=>setPassword(e.target.value)}
              placeholder="Password"
              type='password'
              {...register('password', {
                required: 'Password is required',
                // pattern: {
                //   value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                //   message:
                //     'Password must be at least 8 characters, include uppercase, lowercase, number, and special character',
                // },
              })}
            />
            {errors.password && <FormError message={errors.password?.message} />}
          </div>

          <FormButton ClassName="w-full" type="submit" loading={loading} IsValid={true}>
                  Create
          </FormButton>
          </FormWrapper>
        
      </div>
    </div>
  );
}
