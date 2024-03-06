import { DynamicWidget } from '@dynamic-labs/sdk-react-core';
import React, { useEffect, useState } from 'react'
import { useAccount, useReadContract, useWriteContract } from 'wagmi';
import abi from "./abi.json"

const Test = () => {
    const { address, isConnected, chain, chainId } = useAccount();
    const [fetchedval,setfetchedVal]=useState(0)
    const [writeVal,setWriteVal] = useState(0)
    const contractAddress = "0xfcDbCC445768cB910A4E3b79cB70b763613ADd43"

    const {
        isError: getError,
        isLoading: getLoading,
        isSuccess: getSuccess,
        refetch: getHook,
    } = useReadContract({
        address: contractAddress,
        abi: abi,
        functionName: "get",
        args: [],
    });

    const {
        writeContract,
        data:setdata,status:setstatus,
    } = useWriteContract({});

useEffect(()=>{
console.log("setdata",setdata);
console.log("status",setstatus);
},[setdata,setstatus])

    const read = async () => {
        const { data } = await getHook()
        setfetchedVal(Number(data))
        console.log("result", data);
    }

    const writeMethod = async () => {
        await writeContract({
            address: contractAddress,
            abi: abi,
            functionName: "set",
            args: [writeVal],
        })
    }
    return (
        <div>
            <p>Welcome to xyz</p>
            <p>Address - {address}, chainId - {chainId}</p>
            <DynamicWidget />
            <br />
            {/* <button onClick={writeMethod}>write</button> */}

            <p>value is {fetchedval}</p>
            <button onClick={read}>refresh</button>
            <br/>
            <br/>

            <br/>
            <input type='number' onChange={e=>setWriteVal(e.target.value)}></input>
            <button onClick={writeMethod}>submit</button>
        </div>
    )
}

export default Test