import Head from 'next/head'
import React, { useState, useEffect } from "react"
import axios from 'axios'
import useSWR from 'swr'

export default function Home() {

  const [id, setId] = useState("invisible-tech")

  const fetcher = (url) => axios.get(url).then(res => res.data)

  const { data, error } = useSWR(() => "/api/github/" + id, fetcher)

  if (error) {
    return (
      <>
        <div>{error.message}</div>
      </>
    )
  }

  if (!data) {
    return (
      <>
        <div>Loading ...</div>
      </>
    )
  }

  console.log(data)

  return (
    <>
      <div>
        <ul>
          {data.map((repo) => (
            <li key={repo.id}>
              {repo.name}
              <Pulls repoName={repo.name} />
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

const Pulls = ({ repoName }) => {

  const [pulls, setPulls] = useState([])

  useEffect(() => {
    async function getPulls() {
      try {
        const pullUrl = "https://api.github.com/repos/invisible-tech/" + repoName + "/pulls"
        const response = await axios.get(pullUrl)
        const data = await response.data
        // console.log(data)
        setPulls(data)
      } catch (e) {
        console.log(e.message)
      }
    }
    getPulls()
  }, [repoName])

  return (
    <>
      <ul>
        {pulls.length > 0 && pulls.map((pull) => (
          <li key={pull.id}>
            {pull.state}
          </li>
        ))}
        {pulls.length === 0 &&
          <li>No pull requests</li>
        }
      </ul>
    </>
  )
}
