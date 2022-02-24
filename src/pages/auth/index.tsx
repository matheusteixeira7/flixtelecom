import Image from 'next/image'
import { useState } from 'react'
import { supabase } from '../../utils/supabaseClient'

import FlixLogo from '../../../public/images/flix-logo.svg'
import styles from './auth-styles.module.scss'

export default function AuthFlix() {
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState('')

    const handleLogin = async (email) => {
        try {
            setLoading(true)
            const { error } = await supabase.auth.signIn({ email })
            if (error) throw error
            alert('Check your email for the login link!')
        } catch (error) {
            alert(error.error_description || error.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <Image src={FlixLogo} alt="AuthFlix" width={100} height={70} />
                <h1>Faça login na plataforma</h1>
            </header>

            <body className={styles.auth__container}>
                <input
                    className="inputField"
                    type="email"
                    placeholder="Seu email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <button
                    onClick={(e) => {
                        e.preventDefault()
                        handleLogin(email)
                    }}
                    className="button block"
                    disabled={loading}
                >
                    <span>{loading ? 'Loading' : 'Fazer login'}</span>
                </button>
            </body>
        </div>
    )
}
