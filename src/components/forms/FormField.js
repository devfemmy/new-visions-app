import React from 'react'
import { useFormikContext } from 'formik'

import TextInput from '../TextInput'
import ErrorMessage from './ErrorMessage'
import { heightp } from '../../utils/responsiveDesign'

function AppFormField({ name, width, password, ...otherProps }) {
    const { setFieldTouched, handleChange, errors, touched } =
        useFormikContext()
    // console.log(useFormikContext());
    return (
        <>
            <TextInput
                onBlur={() => setFieldTouched(name)}
                onChangeText={handleChange(name)}
                width={width}
                style={{
                    width: !password ? '100%' : '90%',
                    height: '100%',
                    paddingHorizontal: heightp(20),
                    fontSize: heightp(20),
                    color: '#000',
                }}
                password={password}
                {...otherProps}
            />
            <ErrorMessage error={errors[name]} visible={touched[name]} />
        </>
    )
}

export default AppFormField
