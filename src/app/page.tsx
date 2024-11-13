import { redirect } from "next/navigation"


const Page = () => {

    redirect('/login')

    return(
        <div>
            <h4>cachorro</h4>
        </div>
    )
}

export default Page