import React, { useState, useEffect } from 'react'
import { MenuHeader } from './Menu'
import './form.css'
import './trend.css'
import { Button, Form, Label, Table } from 'semantic-ui-react'
import Loader from 'react-loader-spinner'
import { Footer } from './Footer'
import Select from 'react-select'
import axios from 'axios'

const options = [
    { key: 'IIT', text: 'IIT', value: 'IIT' },
    { key: 'IIIT', text: 'IIIT', value: 'IIIT' },
    { key: 'NIT', text: 'NIT', value: 'NIT' },
    { key: 'GFTI', text: 'GFTI', value: 'GFTI' },
]
const category = [
    { key: 'General', text: 'General', value: 'General' },
    { key: 'General Pwd', text: 'General PwD', value: 'General Pwd' },
    { key: 'GEN-EWS', text: 'General EWS', value: 'GEN-EWS' },
    { key: 'GEN-EWS(PwD)', text: 'General EWS (PwD)', value: 'GEN-EWS(PwD)' },
    { key: 'OBC-NCL', text: 'OBC NCL', value: 'OBC-NCL' },
    { key: 'OBC_NCL(PwD)', text: 'OBC NCL(PwD)', value: 'OBC_NCL(PwD)' },
    { key: 'SC', text: 'SC', value: 'SC' },
    { key: 'SC PwD', text: 'SC PwD', value: 'SC PwD' },
    { key: 'ST', text: 'ST', value: 'ST' },
    { key: 'ST PwD', text: 'ST PwD', value: 'ST PwD' },
]
const pool = [
    { key: 'Gender-Neutral', text: 'Gender Neutral', value: 'Gender-Neutral' },
    { key: 'Female-Only', text: 'Female Only', value: 'Female-only' },
]
const type = [
    { key: 'closing_rank', text: 'Closing Rank', value: 'closing_rank' },
    { key: 'opening_rank', text: 'Opening Rank', value: 'opening_rank' },
]
const year = [
    { key: "2020", text: "JoSAA 2020", value: "2020" },
    { key: "2019", text: "JoSAA 2019", value: "2019" },
    { key: "2018", text: "JoSAA 2018", value: "2018" },
    { key: "2017", text: "JoSAA 2017", value: "2017" },
    { key: "2016", text: "JoSAA 2016", value: "2016" },
    { key: "2015", text: "JoSAA 2015", value: "2015" },
]

export const FormTrend = (props) => {

    const [ins, setins] = useState('')
    const [seat_pool, setpool] = useState('')
    const [categoryValue, setcat] = useState('')
    const [quotaValue, setq] = useState('')
    const [rank, setr] = useState('')
    const [trendIns, settrendIns] = useState(0)
    const [trendBr, settrendBr] = useState(0)
    const [instituteOption, setinstituteOption] = useState([])
    const [branchOption, setbranchOption] = useState([])
    const [btn, setbtn] = useState(false)
    const [error, seterror] = useState('')
    const [quota, setquota] = useState([])
    const [placeHolder, setplaceHolder] = useState("")
    const [disable, setdisable] = useState(true)
    const [disable2, setdisable2] = useState(true)
    const [errorA, seterrorA] = useState(false)
    const [loading1, setloading1] = useState(true)
    const [valueI, setvalueI] = useState("")
    const [valueB, setvalueB] = useState("")
    const [cb, setcb] = useState([])
    const [loading, setloading] = useState(true)


    const api = 'https://mysoce.pythonanywhere.com/soce/college_branch/'
    useEffect(() => {
        axios.get(api)
            .then(res => {
                setcb(res.data)
                setloading(false)
            })
    }, [])

    const instituteChange = (e, { value }) => {
        reset()
        setvalueI(null)
        setvalueB(null)
        if (value === "IIT" || value === "IIIT") {
            setquota([{ key: 'AI', text: 'AI', value: 'AI' }])
        }
        else if (value === "NIT") {
            setquota([{ key: 'HS', text: 'HS', value: 'HS' }, { key: 'OS', text: 'OS', value: 'OS' },
            { key: 'AP', text: 'AP', value: 'AP' }, { key: 'GO', text: 'GO', value: 'GO' }, { key: 'LA', text: 'LA', value: 'LA' }, { key: 'JK', text: 'JK', value: 'JK' }])
        }
        else if (value === "GFTI") {
            setquota([{ key: 'AI', text: 'AI', value: 'AI' }, { key: 'HS', text: 'HS', value: 'HS' },
            { key: 'OS', text: 'OS', value: 'OS' }])
        }
        if (value === "IIT") {
            setplaceHolder("JEE (ADVANCE) Rank")
        } else {
            setplaceHolder("JEE (MAINS) Rank")
        }
        setdisable(false)
        setins(value)

        var data = []
        props.institutes.map(institute => {
            if (institute.category === value && institute.current === "Y") {
                data.push({ label: institute.display_code, value: institute.id })
            }
            return null
        })
        setinstituteOption(data)
    }
    const handelC = (e, { value }) => {
        setcat(value)
        reset()
    }
    const handelG = (e, { value }) => {
        setpool(value)
        reset()
    }
    const handelR = (e, { value }) => {
        reset()
        if (value.match(/^[0-9]+$/) != null) {
            setr(value)
        }
    }
    const handelQ = (e, { value }) => {
        setq(value)
        reset()
    }
    const trendInstitute = (e) => {
        settrendIns(e.value)
        setvalueI(e)
        setvalueB(null)
        settrendBr(0)
        var data = []
        for (var x = 0; x < cb.length; x++) {
            if (cb[x].institute_code === parseInt(e.value)) {
                data.push({ label: (props.branches.find(o => o.id === cb[x].branch_code).branch_code), value: (props.branches.find(o => o.id === cb[x].branch_code).id) })
            }
        }
        setbranchOption(data)
        setdisable2(false)
        reset()
    }

    const trendBranch = (e) => {
        settrendBr(e.value)
        setvalueB(e)
        reset()
    }
    const buttonClick = () => {
        reset()
        if ((ins !== '') && (categoryValue !== '') && (seat_pool !== '') && (quotaValue !== '') && (trendIns !== 0) && (trendBr !== 0)) {
            if ((rank !== '') && rank > '0') {
                setloading1(false)
                setbtn(true)
            } else {
                seterror("Please enter Correct Rank")
            }
        } else {
            seterror("Please enter value in all the fields")
        }
    }
    const [y715, sety715] = useState([])
    const [loading0, setloading0] = useState(true)
    const api0 = "https://mysoce.pythonanywhere.com/soce/7_2015/"
    useEffect(() => {
        if (!loading1) {
            axios.get(api0)
                .then(res => {
                    sety715(res.data)
                    setloading0(false)
                })
                .catch(err => {
                    seterrorA(true)
                    if (err.response) {
                        console.log(err.response.data);
                        console.log(err.response.status);
                        console.log(err.response.headers);
                    } else if (err.request) {
                        console.log(err.request);
                    } else {
                        console.log('Error', err.message);
                    }
                })
        }
    }, [loading1])
    const [y116, sety116] = useState([])
    const [loading2, setloading2] = useState(true)
    const api1 = "https://mysoce.pythonanywhere.com/soce/1_2016/"
    useEffect(() => {
        if (!loading1) {
            axios.get(api1)
                .then(res => {
                    sety116(res.data)
                    setloading2(false)
                })
                .catch(err => {
                    seterrorA(true)
                    if (err.response) {
                        console.log(err.response.data);
                        console.log(err.response.status);
                        console.log(err.response.headers);
                    } else if (err.request) {
                        console.log(err.request);
                    } else {
                        console.log('Error', err.message);
                    }
                })
        }
    }, [loading1])
    const [y216, sety216] = useState([])
    const [loading3, setloading3] = useState(true)
    const api2 = "https://mysoce.pythonanywhere.com/soce/2_2016/"
    useEffect(() => {
        if (!loading1) {
            axios.get(api2)
                .then(res => {
                    sety216(res.data)
                    setloading3(false)
                })
                .catch(err => {
                    seterrorA(true)
                    if (err.response) {
                        console.log(err.response.data);
                        console.log(err.response.status);
                        console.log(err.response.headers);
                    } else if (err.request) {
                        console.log(err.request);
                    } else {
                        console.log('Error', err.message);
                    }
                })
        }
    }, [loading1])
    const [y316, sety316] = useState([])
    const [loading4, setloading4] = useState(true)
    const api3 = "https://mysoce.pythonanywhere.com/soce/3_2016/"
    useEffect(() => {
        if (!loading1) {
            axios.get(api3)
                .then(res => {
                    sety316(res.data)
                    setloading4(false)
                })
                .catch(err => {
                    seterrorA(true)
                    if (err.response) {
                        console.log(err.response.data);
                        console.log(err.response.status);
                        console.log(err.response.headers);
                    } else if (err.request) {
                        console.log(err.request);
                    } else {
                        console.log('Error', err.message);
                    }
                })
        }
    }, [loading1])
    const [y416, sety416] = useState([])
    const [loading5, setloading5] = useState(true)
    const api4 = "https://mysoce.pythonanywhere.com/soce/4_2016/"
    useEffect(() => {
        if (!loading1) {
            axios.get(api4)
                .then(res => {
                    sety416(res.data)
                    setloading5(false)
                })
                .catch(err => {
                    seterrorA(true)
                    if (err.response) {
                        console.log(err.response.data);
                        console.log(err.response.status);
                        console.log(err.response.headers);
                    } else if (err.request) {
                        console.log(err.request);
                    } else {
                        console.log('Error', err.message);
                    }
                })
        }
    }, [loading1])
    const [y516, sety516] = useState([])
    const [loading6, setloading6] = useState(true)
    const api5 = "https://mysoce.pythonanywhere.com/soce/5_2016/"
    useEffect(() => {
        if (!loading1) {
            axios.get(api5)
                .then(res => {
                    sety516(res.data)
                    setloading6(false)
                })
                .catch(err => {
                    seterrorA(true)
                    if (err.response) {
                        console.log(err.response.data);
                        console.log(err.response.status);
                        console.log(err.response.headers);
                    } else if (err.request) {
                        console.log(err.request);
                    } else {
                        console.log('Error', err.message);
                    }
                })
        }
    }, [loading1])
    const [y616, sety616] = useState([])
    const [loading7, setloading7] = useState(true)
    const api6 = "https://mysoce.pythonanywhere.com/soce/6_2016/"
    useEffect(() => {
        if (!loading1) {
            axios.get(api6)
                .then(res => {
                    sety616(res.data)
                    setloading7(false)
                })
                .catch(err => {
                    seterrorA(true)
                    if (err.response) {
                        console.log(err.response.data);
                        console.log(err.response.status);
                        console.log(err.response.headers);
                    } else if (err.request) {
                        console.log(err.request);
                    } else {
                        console.log('Error', err.message);
                    }
                })
        }
    }, [loading1])


    const [y117, sety117] = useState([])
    const [loading8, setloading8] = useState(true)
    const api7 = "https://mysoce.pythonanywhere.com/soce/1_2017/"
    useEffect(() => {
        if (!loading1) {
            axios.get(api7)
                .then(res => {
                    sety117(res.data)
                    setloading8(false)
                })
                .catch(err => {
                    seterrorA(true)
                    if (err.response) {
                        console.log(err.response.data);
                        console.log(err.response.status);
                        console.log(err.response.headers);
                    } else if (err.request) {
                        console.log(err.request);
                    } else {
                        console.log('Error', err.message);
                    }
                })
        }
    }, [loading1])
    const [y217, sety217] = useState([])
    const [loading9, setloading9] = useState(true)
    const api8 = "https://mysoce.pythonanywhere.com/soce/2_2017/"
    useEffect(() => {
        if (!loading1) {
            axios.get(api8)
                .then(res => {
                    sety217(res.data)
                    setloading9(false)
                })
                .catch(err => {
                    seterrorA(true)
                    if (err.response) {
                        console.log(err.response.data);
                        console.log(err.response.status);
                        console.log(err.response.headers);
                    } else if (err.request) {
                        console.log(err.request);
                    } else {
                        console.log('Error', err.message);
                    }
                })
        }
    }, [loading1])
    const [y317, sety317] = useState([])
    const [loading10, setloading10] = useState(true)
    const api9 = "https://mysoce.pythonanywhere.com/soce/3_2017/"
    useEffect(() => {
        if (!loading1) {
            axios.get(api9)
                .then(res => {
                    sety317(res.data)
                    setloading10(false)
                })
                .catch(err => {
                    seterrorA(true)
                    if (err.response) {
                        console.log(err.response.data);
                        console.log(err.response.status);
                        console.log(err.response.headers);
                    } else if (err.request) {
                        console.log(err.request);
                    } else {
                        console.log('Error', err.message);
                    }
                })
        }
    }, [loading1])
    const [y417, sety417] = useState([])
    const [loading11, setloading11] = useState(true)
    const api10 = "https://mysoce.pythonanywhere.com/soce/4_2017/"
    useEffect(() => {
        if (!loading1) {
            axios.get(api10)
                .then(res => {
                    sety417(res.data)
                    setloading11(false)
                })
                .catch(err => {
                    seterrorA(true)
                    if (err.response) {
                        console.log(err.response.data);
                        console.log(err.response.status);
                        console.log(err.response.headers);
                    } else if (err.request) {
                        console.log(err.request);
                    } else {
                        console.log('Error', err.message);
                    }
                })
        }
    }, [loading1])
    const [y517, sety517] = useState([])
    const [loading12, setloading12] = useState(true)
    const api11 = "https://mysoce.pythonanywhere.com/soce/5_2017/"
    useEffect(() => {
        if (!loading1) {
            axios.get(api11)
                .then(res => {
                    sety517(res.data)
                    setloading12(false)
                })
                .catch(err => {
                    seterrorA(true)
                    if (err.response) {
                        console.log(err.response.data);
                        console.log(err.response.status);
                        console.log(err.response.headers);
                    } else if (err.request) {
                        console.log(err.request);
                    } else {
                        console.log('Error', err.message);
                    }
                })
        }
    }, [loading1])
    const [y617, sety617] = useState([])
    const [loading13, setloading13] = useState(true)
    const api12 = "https://mysoce.pythonanywhere.com/soce/6_2017/"
    useEffect(() => {
        if (!loading1) {
            axios.get(api12)
                .then(res => {
                    sety617(res.data)
                    setloading13(false)
                })
                .catch(err => {
                    seterrorA(true)
                    if (err.response) {
                        console.log(err.response.data);
                        console.log(err.response.status);
                        console.log(err.response.headers);
                    } else if (err.request) {
                        console.log(err.request);
                    } else {
                        console.log('Error', err.message);
                    }
                })
        }
    }, [loading1])
    const [y717, sety717] = useState([])
    const [loading14, setloading14] = useState(true)
    const api13 = "https://mysoce.pythonanywhere.com/soce/7_2017/"
    useEffect(() => {
        if (!loading1) {
            axios.get(api13)
                .then(res => {
                    sety717(res.data)
                    setloading14(false)
                })
                .catch(err => {
                    seterrorA(true)
                    if (err.response) {
                        console.log(err.response.data);
                        console.log(err.response.status);
                        console.log(err.response.headers);
                    } else if (err.request) {
                        console.log(err.request);
                    } else {
                        console.log('Error', err.message);
                    }
                })
        }
    }, [loading1])


    const [y118, sety118] = useState([])
    const [loading15, setloading15] = useState(true)
    const api14 = "https://mysoce.pythonanywhere.com/soce/1_2018/"
    useEffect(() => {
        if (!loading1) {
            axios.get(api14)
                .then(res => {
                    sety118(res.data)
                    setloading15(false)
                })
                .catch(err => {
                    seterrorA(true)
                    if (err.response) {
                        console.log(err.response.data);
                        console.log(err.response.status);
                        console.log(err.response.headers);
                    } else if (err.request) {
                        console.log(err.request);
                    } else {
                        console.log('Error', err.message);
                    }
                })
        }
    }, [loading1])
    const [y218, sety218] = useState([])
    const [loading16, setloading16] = useState(true)
    const api15 = "https://mysoce.pythonanywhere.com/soce/2_2018/"
    useEffect(() => {
        if (!loading1) {
            axios.get(api15)
                .then(res => {
                    sety218(res.data)
                    setloading16(false)
                })
                .catch(err => {
                    seterrorA(true)
                    if (err.response) {
                        console.log(err.response.data);
                        console.log(err.response.status);
                        console.log(err.response.headers);
                    } else if (err.request) {
                        console.log(err.request);
                    } else {
                        console.log('Error', err.message);
                    }
                })
        }
    }, [loading1])
    const [y318, sety318] = useState([])
    const [loading17, setloading17] = useState(true)
    const api16 = "https://mysoce.pythonanywhere.com/soce/3_2018/"
    useEffect(() => {
        if (!loading1) {
            axios.get(api16)
                .then(res => {
                    sety318(res.data)
                    setloading17(false)
                })
                .catch(err => {
                    seterrorA(true)
                    if (err.response) {
                        console.log(err.response.data);
                        console.log(err.response.status);
                        console.log(err.response.headers);
                    } else if (err.request) {
                        console.log(err.request);
                    } else {
                        console.log('Error', err.message);
                    }
                })
        }
    }, [loading1])
    const [y418, sety418] = useState([])
    const [loading34, setloading34] = useState(true)
    const api17 = "https://mysoce.pythonanywhere.com/soce/4_2018/"
    useEffect(() => {
        if (!loading1) {
            axios.get(api17)
                .then(res => {
                    sety418(res.data)
                    setloading34(false)
                })
                .catch(err => {
                    seterrorA(true)
                    if (err.response) {
                        console.log(err.response.data);
                        console.log(err.response.status);
                        console.log(err.response.headers);
                    } else if (err.request) {
                        console.log(err.request);
                    } else {
                        console.log('Error', err.message);
                    }
                })
        }
    }, [loading1])
    const [y518, sety518] = useState([])
    const [loading18, setloading18] = useState(true)
    const api18 = "https://mysoce.pythonanywhere.com/soce/5_2018/"
    useEffect(() => {
        if (!loading1) {
            axios.get(api18)
                .then(res => {
                    sety518(res.data)
                    setloading18(false)
                })
                .catch(err => {
                    seterrorA(true)
                    if (err.response) {
                        console.log(err.response.data);
                        console.log(err.response.status);
                        console.log(err.response.headers);
                    } else if (err.request) {
                        console.log(err.request);
                    } else {
                        console.log('Error', err.message);
                    }
                })
        }
    }, [loading1])
    const [y618, sety618] = useState([])
    const [loading19, setloading19] = useState(true)
    const api19 = "https://mysoce.pythonanywhere.com/soce/6_2018/"
    useEffect(() => {
        if (!loading1) {
            axios.get(api19)
                .then(res => {
                    sety618(res.data)
                    setloading19(false)
                })
                .catch(err => {
                    seterrorA(true)
                    if (err.response) {
                        console.log(err.response.data);
                        console.log(err.response.status);
                        console.log(err.response.headers);
                    } else if (err.request) {
                        console.log(err.request);
                    } else {
                        console.log('Error', err.message);
                    }
                })
        }
    }, [loading1])
    const [y718, sety718] = useState([])
    const [loading20, setloading20] = useState(true)
    const api20 = "https://mysoce.pythonanywhere.com/soce/7_2018/"
    useEffect(() => {
        if (!loading1) {
            axios.get(api20)
                .then(res => {
                    sety718(res.data)
                    setloading20(false)
                })
                .catch(err => {
                    seterrorA(true)
                    if (err.response) {
                        console.log(err.response.data);
                        console.log(err.response.status);
                        console.log(err.response.headers);
                    } else if (err.request) {
                        console.log(err.request);
                    } else {
                        console.log('Error', err.message);
                    }
                })
        }
    }, [loading1])
    const [y119, sety119] = useState([])
    const [loading21, setloading21] = useState(true)
    const api21 = "https://mysoce.pythonanywhere.com/soce/1_2019/"
    useEffect(() => {
        if (!loading1) {
            axios.get(api21)
                .then(res => {
                    sety119(res.data)
                    setloading21(false)
                })
                .catch(err => {
                    seterrorA(true)
                    if (err.response) {
                        console.log(err.response.data);
                        console.log(err.response.status);
                        console.log(err.response.headers);
                    } else if (err.request) {
                        console.log(err.request);
                    } else {
                        console.log('Error', err.message);
                    }
                })
        }
    }, [loading1])
    const [y219, sety219] = useState([])
    const [loading22, setloading22] = useState(true)
    const api22 = "https://mysoce.pythonanywhere.com/soce/2_2019/"
    useEffect(() => {
        if (!loading1) {
            axios.get(api22)
                .then(res => {
                    sety219(res.data)
                    setloading22(false)
                })
                .catch(err => {
                    seterrorA(true)
                    if (err.response) {
                        console.log(err.response.data);
                        console.log(err.response.status);
                        console.log(err.response.headers);
                    } else if (err.request) {
                        console.log(err.request);
                    } else {
                        console.log('Error', err.message);
                    }
                })
        }
    }, [loading1])
    const [y319, sety319] = useState([])
    const [loading23, setloading23] = useState(true)
    const api23 = "https://mysoce.pythonanywhere.com/soce/3_2019/"
    useEffect(() => {
        if (!loading1) {
            axios.get(api23)
                .then(res => {
                    sety319(res.data)
                    setloading23(false)
                })
                .catch(err => {
                    seterrorA(true)
                    if (err.response) {
                        console.log(err.response.data);
                        console.log(err.response.status);
                        console.log(err.response.headers);
                    } else if (err.request) {
                        console.log(err.request);
                    } else {
                        console.log('Error', err.message);
                    }
                })
        }
    }, [loading1])
    const [y419, sety419] = useState([])
    const [loading24, setloading24] = useState(true)
    const api24 = "https://mysoce.pythonanywhere.com/soce/4_2019/"
    useEffect(() => {
        if (!loading1) {
            axios.get(api24)
                .then(res => {
                    sety419(res.data)
                    setloading24(false)
                })
                .catch(err => {
                    seterrorA(true)
                    if (err.response) {
                        console.log(err.response.data);
                        console.log(err.response.status);
                        console.log(err.response.headers);
                    } else if (err.request) {
                        console.log(err.request);
                    } else {
                        console.log('Error', err.message);
                    }
                })
        }
    }, [loading1])
    const [y519, sety519] = useState([])
    const [loading25, setloading25] = useState(true)
    const api25 = "https://mysoce.pythonanywhere.com/soce/5_2019/"
    useEffect(() => {
        if (!loading1) {
            axios.get(api25)
                .then(res => {
                    sety519(res.data)
                    setloading25(false)
                })
                .catch(err => {
                    seterrorA(true)
                    if (err.response) {
                        console.log(err.response.data);
                        console.log(err.response.status);
                        console.log(err.response.headers);
                    } else if (err.request) {
                        console.log(err.request);
                    } else {
                        console.log('Error', err.message);
                    }
                })
        }
    }, [loading1])
    const [y619, sety619] = useState([])
    const [loading26, setloading26] = useState(true)
    const api26 = "https://mysoce.pythonanywhere.com/soce/6_2019/"
    useEffect(() => {
        if (!loading1) {
            axios.get(api26)
                .then(res => {
                    sety619(res.data)
                    setloading26(false)
                })
                .catch(err => {
                    seterrorA(true)
                    if (err.response) {
                        console.log(err.response.data);
                        console.log(err.response.status);
                        console.log(err.response.headers);
                    } else if (err.request) {
                        console.log(err.request);
                    } else {
                        console.log('Error', err.message);
                    }
                })
        }
    }, [loading1])
    const [y719, sety719] = useState([])
    const [loading27, setloading27] = useState(true)
    const api27 = "https://mysoce.pythonanywhere.com/soce/7_2019/"
    useEffect(() => {
        if (!loading1) {
            axios.get(api27)
                .then(res => {
                    sety719(res.data)
                    setloading27(false)
                })
                .catch(err => {
                    seterrorA(true)
                    if (err.response) {
                        console.log(err.response.data);
                        console.log(err.response.status);
                        console.log(err.response.headers);
                    } else if (err.request) {
                        console.log(err.request);
                    } else {
                        console.log('Error', err.message);
                    }
                })
        }
    }, [loading1])
    const [y120, sety120] = useState([])
    const [loading28, setloading28] = useState(true)
    const api28 = "https://mysoce.pythonanywhere.com/soce/1_2020/"
    useEffect(() => {
        if (!loading1) {
            axios.get(api28)
                .then(res => {
                    sety120(res.data)
                    setloading28(false)
                })
                .catch(err => {
                    seterrorA(true)
                    if (err.response) {
                        console.log(err.response.data);
                        console.log(err.response.status);
                        console.log(err.response.headers);
                    } else if (err.request) {
                        console.log(err.request);
                    } else {
                        console.log('Error', err.message);
                    }
                })
        }
    }, [loading1])
    const [y220, sety220] = useState([])
    const [loading29, setloading29] = useState(true)
    const api29 = "https://mysoce.pythonanywhere.com/soce/2_2020/"
    useEffect(() => {
        if (!loading1) {
            axios.get(api29)
                .then(res => {
                    sety220(res.data)
                    setloading29(false)
                })
                .catch(err => {
                    seterrorA(true)
                    if (err.response) {
                        console.log(err.response.data);
                        console.log(err.response.status);
                        console.log(err.response.headers);
                    } else if (err.request) {
                        console.log(err.request);
                    } else {
                        console.log('Error', err.message);
                    }
                })
        }
    }, [loading1])
    const [y320, sety320] = useState([])
    const [loading30, setloading30] = useState(true)
    const api30 = "https://mysoce.pythonanywhere.com/soce/3_2020/"
    useEffect(() => {
        if (!loading1) {
            axios.get(api30)
                .then(res => {
                    sety320(res.data)
                    setloading30(false)
                })
                .catch(err => {
                    seterrorA(true)
                    if (err.response) {
                        console.log(err.response.data);
                        console.log(err.response.status);
                        console.log(err.response.headers);
                    } else if (err.request) {
                        console.log(err.request);
                    } else {
                        console.log('Error', err.message);
                    }
                })
        }
    }, [loading1])
    const [y420, sety420] = useState([])
    const [loading31, setloading31] = useState(true)
    const api31 = "https://mysoce.pythonanywhere.com/soce/4_2020/"
    useEffect(() => {
        if (!loading1) {
            axios.get(api31)
                .then(res => {
                    sety420(res.data)
                    setloading31(false)
                })
                .catch(err => {
                    seterrorA(true)
                    if (err.response) {
                        console.log(err.response.data);
                        console.log(err.response.status);
                        console.log(err.response.headers);
                    } else if (err.request) {
                        console.log(err.request);
                    } else {
                        console.log('Error', err.message);
                    }
                })
        }
    }, [loading1])
    const [y520, sety520] = useState([])
    const [loading32, setloading32] = useState(true)
    const api32 = "https://mysoce.pythonanywhere.com/soce/5_2020/"
    useEffect(() => {
        if (!loading1) {
            axios.get(api32)
                .then(res => {
                    sety520(res.data)
                    setloading32(false)
                })
                .catch(err => {
                    seterrorA(true)
                    if (err.response) {
                        console.log(err.response.data);
                        console.log(err.response.status);
                        console.log(err.response.headers);
                    } else if (err.request) {
                        console.log(err.request);
                    } else {
                        console.log('Error', err.message);
                    }
                })
        }
    }, [loading1])
    const [y620, sety620] = useState([])
    const [loading33, setloading33] = useState(true)
    const api33 = "https://mysoce.pythonanywhere.com/soce/6_2020/"
    useEffect(() => {
        if (!loading1) {
            axios.get(api33)
                .then(res => {
                    sety620(res.data)
                    setloading33(false)
                })
                .catch(err => {
                    seterrorA(true)
                    if (err.response) {
                        console.log(err.response.data);
                        console.log(err.response.status);
                        console.log(err.response.headers);
                    } else if (err.request) {
                        console.log(err.request);
                    } else {
                        console.log('Error', err.message);
                    }
                })
        }
    }, [loading1])


    const ranks = {
        "7_2015": y715, "1_2016": y116, "2_2016": y216, "3_2016": y316, "4_2016": y416, "5_2016": y516, "6_2016": y616,
        "1_2020": y120, "2_2020": y220, "3_2020": y320, "4_2020": y420, "5_2020": y520, "6_2020": y620,
        "1_2017": y117, "2_2017": y217, "3_2017": y317, "4_2017": y417, "5_2017": y517, "6_2017": y617, "7_2017": y717,
        "1_2018": y118, "2_2018": y218, "3_2018": y318, "4_2018": y418, "5_2018": y518, "6_2018": y618, "7_2018": y718,
        "1_2019": y119, "2_2019": y219, "3_2019": y319, "4_2019": y419, "5_2019": y519, "6_2019": y619, "7_2019": y719,
    }

    const yearArray = ["2020", '2019', '2018', '2017', '2016', '2015']
    const roundArray = ['1', '2', '3', '4', '5', '6', '7']

    return (
        <>
            <MenuHeader active="prediction" set={false} />
            <h2 className="pageHeading">Past Trend of Opening/Closing Ranks for <span id="collegeId">a Particular Branch</span> in <span id="collegeId">an Institute</span></h2>
            <Form>
                <div id="trendForm">
                    <div id="trendInput">
                        <Form.Group widths="equal">
                            <Form.Select
                                id="mySelect"
                                fluid
                                label='Institute'
                                options={options}
                                placeholder='Select Institute Type'
                                onChange={instituteChange}
                            />
                            <Form.Select
                                id="mySelect"
                                fluid
                                label='Category'
                                options={category}
                                placeholder='Select Category'
                                onChange={handelC}
                            />
                            <Form.Select
                                id="mySelect"
                                fluid
                                label='Gender'
                                options={pool}
                                placeholder='Select Gender'
                                onChange={handelG}
                            />
                            <Form.Select
                                id="mySelect"
                                fluid
                                label='Quota'
                                options={quota}
                                disabled={disable}
                                placeholder='Select Quota'
                                onChange={handelQ}
                            />
                            <Form.Input id="mySelect" type="number" fluid placeholder="Enter your Rank" label={placeHolder} disabled={disable} onChange={handelR} min='0' />
                        </Form.Group>
                        <div id="trend">
                            <label id="trendLabel">Select Institute</label>
                            <Select
                                id="trendSelect"
                                name='Institute'
                                value={valueI}
                                options={instituteOption}
                                placeholder='Select or Type Institute Name'
                                isDisabled={disable}
                                onChange={trendInstitute}
                            />
                            <label id="trendLabel">Select Branch</label>
                            <Select
                                id="trendSelect"
                                name='Branch'
                                value={valueB}
                                options={branchOption}
                                placeholder='Select or Type Branch Name'
                                isDisabled={disable2}
                                onChange={trendBranch}
                            />
                        </div>
                    </div>
                    <div id="Errordiv">
                        {error ? <div className='message'>{error}</div> : <></>}
                        {btn ? <></> : <Form.Button id="submitBtn" disabled={disable} onClick={buttonClick} primary >Submit</Form.Button>}
                    </div>
                </div>
            </Form>
            {btn ?
                <div id="afterForm">
                    {
                        errorA ? <div className='message'>Error in loading the data</div> :
                            <>
                                {(loading0 || loading2 || loading3 || loading4 || loading5 || loading6 || loading7 || loading8 || loading9 || loading10 || loading11 || loading12 || loading13 || loading14 || loading15 || loading16 || loading17 || loading18 || loading19 || loading20 || loading21 || loading22 || loading23 || loading24 || loading25 || loading26 || loading27 || loading28 || loading29 || loading30 || loading31 || loading32 || loading33 || loading34) ?
                                    <><br /><br /><Loader className="loading" type="BallTriangle" color="black" height={80} width={80} /></>
                                    :
                                    <>
                                        <div id="cut">
                                            <Form.Input type="number" id="cutOffV" defaultValue={10} fluid label="Variation in CutOff Percentage(%)" disabled={disable} max="100" />
                                            <Button positive onClick={() => predicit(rank)} className="btn round" id="predict">Click to Get Prediction</Button>
                                        </div>
                                        <div id="trendPrediction">
                                            <Table celled structured id="myTable1" className="unstackable">
                                                <Table.Header>
                                                    <Table.Row>
                                                        <Table.HeaderCell>Year</Table.HeaderCell>
                                                        {roundArray.map(r => (
                                                            <Table.HeaderCell>
                                                                Round {r}
                                                            </Table.HeaderCell>
                                                        ))}
                                                    </Table.Row>
                                                </Table.Header>
                                                <Table.Body>
                                                    {yearArray.map(y => (
                                                        <>
                                                            <Table.Row>
                                                                <Table.Cell id="trendColumn">
                                                                    JoSAA {y}
                                                                </Table.Cell>
                                                                {roundArray.map(r => (
                                                                    <Table.Cell id="data">
                                                                        {(y === '2020') || (y === '2016') ?
                                                                            r === '7' ? '-' : <>{ranks[r + '_' + y].find(o => ((o.branch_code === parseInt(trendBr)) && (o.institute_code === parseInt(trendIns)) && (o.quota === quotaValue) && (o.category === categoryValue) && (o.seat_pool === seat_pool))) === undefined ? '-' : <><p>{ranks[r + '_' + y].find(o => ((o.branch_code === parseInt(trendBr)) && (o.institute_code === parseInt(trendIns)) && (o.quota === quotaValue) && (o.category === categoryValue) && (o.seat_pool === seat_pool))).opening_rank}</p><p>to</p><p>{ranks[r + '_' + y].find(o => ((o.branch_code === parseInt(trendBr)) && (o.institute_code === parseInt(trendIns)) && (o.quota === quotaValue) && (o.category === categoryValue) && (o.seat_pool === seat_pool))).closing_rank}</p></>}</>
                                                                            :
                                                                            (y === '2015') ? (r !== '7') ? '-' : <>{ranks[r + '_' + y].find(o => ((o.branch_code === parseInt(trendBr)) && (o.institute_code === parseInt(trendIns)) && (o.quota === quotaValue) && (o.category === categoryValue) && (o.seat_pool === seat_pool))) === undefined ? '-' : <><p>{ranks[r + '_' + y].find(o => ((o.branch_code === parseInt(trendBr)) && (o.institute_code === parseInt(trendIns)) && (o.quota === quotaValue) && (o.category === categoryValue) && (o.seat_pool === seat_pool))).opening_rank}</p><p>to</p><p>{ranks[r + '_' + y].find(o => ((o.branch_code === parseInt(trendBr)) && (o.institute_code === parseInt(trendIns)) && (o.quota === quotaValue) && (o.category === categoryValue) && (o.seat_pool === seat_pool))).closing_rank}</p></>}</>
                                                                                : <>{ranks[r + '_' + y].find(o => ((o.branch_code === parseInt(trendBr)) && (o.institute_code === parseInt(trendIns)) && (o.quota === quotaValue) && (o.category === categoryValue) && (o.seat_pool === seat_pool))) === undefined ? '-' : <><p>{ranks[r + '_' + y].find(o => ((o.branch_code === parseInt(trendBr)) && (o.institute_code === parseInt(trendIns)) && (o.quota === quotaValue) && (o.category === categoryValue) && (o.seat_pool === seat_pool))).opening_rank}</p><p>to</p><p>{ranks[r + '_' + y].find(o => ((o.branch_code === parseInt(trendBr)) && (o.institute_code === parseInt(trendIns)) && (o.quota === quotaValue) && (o.category === categoryValue) && (o.seat_pool === seat_pool))).closing_rank}</p></>}</>
                                                                        }
                                                                    </Table.Cell>
                                                                ))}
                                                            </Table.Row>
                                                        </>
                                                    ))}
                                                </Table.Body>
                                            </Table>
                                            <div id="labelDiv1">
                                                <Label id="low" className={sessionStorage.getItem('cutOff') !== '0' ? "chnageWidth" : ""}>Very Low Probability for getting this branch</Label>
                                                <Label id="probableO" className={sessionStorage.getItem('cutOff') === '0' ? "removeLable" : ""} >Probable to get this branch if cutoff rank increases by {sessionStorage.getItem('cutOff')}%</Label>
                                                <Label id="probableY" className={sessionStorage.getItem('cutOff') === '0' ? "removeLable" : ""} >Probable to get this branch even if cutoff rank decreases by {sessionStorage.getItem('cutOff')}%</Label>
                                                <Label id="high" className={sessionStorage.getItem('cutOff') !== '0' ? "chnageWidth" : ""}>Very High Probability for getting this branch</Label>
                                            </div>
                                        </div>
                                    </>
                                }
                            </>
                    }
                </div>
                : <></>

            }
            {
                error ? <></> :
                    loading ? <></> : <Footer />
            }
        </>
    )
}

const reset = () => {
    var tr = document.querySelectorAll("[id='data']");
    for (var x = 0; x < tr.length; x++) {
        tr[x].style.backgroundColor = 'initial'
    }
}

const predicit = (r) => {
    document.getElementById("labelDiv1").style.display = 'flex'
    var cutoff = parseInt(document.getElementById("cutOffV").value)
    var tr = document.querySelectorAll("[id='data']");
    var rank = parseInt(r)
    for (var x = 0; x < tr.length; x++) {
        var data = parseInt(tr[x].innerHTML.substr(tr[x].innerHTML.indexOf("to") + 9, tr[x].innerHTML.length - (tr[x].innerHTML.indexOf("to") + 13)));
        if (rank <= Math.round((1 - (cutoff / 100)) * data)) {
            tr[x].style.backgroundColor = '#07d507'
        }
        else if ((rank > Math.round((1 - (cutoff / 100)) * data)) && (rank <= Math.round(data))) {
            tr[x].style.backgroundColor = 'yellow'
        }
        else if (rank > Math.round(data) && rank <= Math.round((1 + (cutoff / 100)) * data)) {
            tr[x].style.backgroundColor = 'orange'
        }
        else if (rank > Math.round((1 + (cutoff / 100)) * data)) {
            tr[x].style.backgroundColor = 'red'
        }
    }
}