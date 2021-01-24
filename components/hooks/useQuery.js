import {useState,useEffect,useRef} from 'react'
import {paletteGenerator} from "../../utils"

export default function useQuery(query) {

    const [newList, setNewList] = useState([]);
    const [defaultList, setDefaultList] = useState([]);
    const queryRef=useRef(false);


    useEffect(() => {
        setDefaultList([...paletteGenerator()])
    }, [])

    const safe_query=query.trim();

    useEffect(() => {
        function main(){

            if (!queryRef.current) {
                queryRef.current=true;
                return;
            }

            if (!query.length) {
                setNewList(defaultList);
                return;
            }

            const newList_=defaultList.filter(palette=>{
                return palette["name"].includes(safe_query)
            })

            setNewList(newList_)

        }

        main();
    }, [query])

    return [newList]
}
