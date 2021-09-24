import axios from "axios"

export default async function handler(req, res) {

    const { id } = req.query

    // console.log(id)

    const apiEndpoint = "https://api.github.com/orgs/" + id + "/repos"

    try {
        const response = await axios.get(apiEndpoint, {
            headers: {
                "Accept": "application/vnd.github.v3+json",
                "User-Agent": "request"
            },
        })
        const data = await response.data
        // console.log(data)
        res.status(200).json(data)
    } catch (e) {
        console.log(e.message)
        res.status(400).end()
    }
}