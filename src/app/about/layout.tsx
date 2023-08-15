import { Suspense } from "react"

const AboutLayout = ({ children }: any) => {
    return (
        <div>
            <h1 className="text-center text-2xl font-semibold">User Info</h1>
            <Suspense fallback={<div className="text-3xl font-semibold">Loading...</div>}>
                {children}
            </Suspense>
        </div>
    )
}

export default AboutLayout