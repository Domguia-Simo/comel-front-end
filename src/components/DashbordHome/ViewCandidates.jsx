

import { MDBCard, MDBCardBody, MDBCardFooter, MDBCardText, MDBCardTitle, MDBCol, MDBRow } from "mdb-react-ui-kit"
import img1 from "../../assets/image/1.jpg"
import img2 from "../../assets/image/2.jpg"
import img3 from "../../assets/image/3.jpg"
import img4 from "../../assets/image/4.jpg"
import img5 from "../../assets/image/5.jpg"
import img6 from "../../assets/image/6.jpg"
import img7 from "../../assets/image/7.jpg"
import img8 from "../../assets/image/8.jpg"
import img9 from "../../assets/image/9.jpg"
const item = [
    {
        title: "Install Wigs",
        description: "This is the DECS title  mjaksjs askjs xnjjan xjsaj jashsjsajsa snjahsja sjadjhjdshalk bjsasjhcjhjas jbjk ahjhja shajk saghasgaks cjaj bsagjasa c ahsajkkjas bkajskasjk bsabkdsa",
        catagory: 'Men',
       image: [img1],
        prix: 320,
    },
    {
        title: "Boho Braids",
        description: "This is the DECS title 1 mjaksjs askjs xnjjan xjsaj jashsjsajsa snjahsja sjadjhjdshalk bjsasjhcjhjas jbjk ahjhja shajk saghasgaks cjaj bsagjasa c ahsajkkjas bkajskasjk bsabkdsa",
        catagory: 'Men',
       image: [img2],
        prix: 220,
    },
    {
        title: "Knotless Braids",
        description: "This is the DECS title 2 mjaksjs askjs xnjjan xjsaj jashsjsajsa snjahsja sjadjhjdshalk bjsasjhcjhjas jbjk ahjhja shajk saghasgaks cjaj bsagjasa c ahsajkkjas bkajskasjk bsabkdsa",
        catagory: 'Men',
       image: [img3],
        prix: 200,
    },
    {
        title: "Cornrows",
        description: "This is the DECS title 3 mjaksjs askjs xnjjan xjsaj jashsjsajsa snjahsja sjadjhjdshalk bjsasjhcjhjas jbjk ahjhja shajk saghasgaks cjaj bsagjasa c ahsajkkjas bkajskasjk bsabkdsa",
        catagory: 'Men',
       image: [img4],
        prix: 120,
    },
    {
        title: "Box Braids",
        description: "This is the DECS title 4 mjaksjs askjs xnjjan xjsaj jashsjsajsa snjahsja sjadjhjdshalk bjsasjhcjhjas jbjk ahjhja shajk saghasgaks cjaj bsagjasa c ahsajkkjas bkajskasjk bsabkdsa",
        catagory: 'Men',
       image: [img5],
        prix: 180,
    },
    {
        title: "Two Strands twist",
        description: "This is the DECS title 5",
        catagory: 'Women',
       image: [img6],
        prix: 85,
    },
    {
        title: "Crochet braids",
        description: "This is the DECS title 6",
        catagory: 'Women',
       image: [img7],
        prix: 160,
    },
    {
        title: "Passion braids",
        description: "This is the DECS title 6",
        catagory: 'Women',
       image: [img8],
        prix: 160,
    },
    {
        title: "Twist",
        description: "This is the DECS title 6",
        catagory: 'Women',
       image: [img9],
        prix: 160,
    }
]

export default function ViewCandidates() {
    function Design({ design, ind }) {
        let shortText
        if (design.description.length > 100) {
            shortText = design.description.slice(0, 100) + '...'
        } else {
            shortText = design.description
        }
        return (
            <MDBCol>
                <MDBCard className='h-100'>
                    <center>
                        <div className='bg-image hover-overlay'
                            style={{
                                width: "200px",
                                height: "200px",
                                borderRadius: "50%",
                            }}>
                            <img
                                className=' pink-circular-fill2'
                                // src='https://mdbootstrap.com/img/new/standard/city/062.webp'
                                src={design.image[0]}
                                alt='...'
                                width={"200px"}
                                height={"200px"}
                            />
                            <div
                                className='mask'
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    background: 'linear-gradient(45deg, rgba(236, 205, 29, 0.5), rgba(79, 59, 4, 0.5) 100%)',
                                }}
                            >
                                {/* <button
                                    className='submit2'
                                    style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center"
                                    }}
                                    onClick={toggleOpen}
                                >
                                    BOOK NOW
                                </button> */}
                            </div>
                        </div>
                        <MDBCardBody style={{ height: "200px" }}>
                            <MDBCardTitle>{design.title}</MDBCardTitle>
                            <MDBCardText style={{ height: "80px" }}>
                                {shortText}
                            </MDBCardText>
                            <div style={{
                                display: "flex",
                                justifyContent: "flex-end"
                            }}>
                                <a href='#detail'>
                                    <button
                                        className='direction'
                                        onClick={() => {
                                            let i = parseInt(ind)
                                            // navigate('/design/' + i)
                                            // navigate('/' + i)
                                        }}>
                                        More..<i className='fas fa-long-arrow-down'></i>
                                    </button>
                                </a>
                            </div>
                        </MDBCardBody>
                        <MDBCardFooter style={{ color: "goldenrod" }}>
                            <h4 className='' style={{ color: "goldenrod" }} >${design.prix}</h4>
                        </MDBCardFooter>
                    </center>
                </MDBCard>
            </MDBCol>
        )
    }
    return (
        <div>
             <MDBRow className='row-cols-1 row-cols-md-4 g-4'>
                    {item.map((items, i) => (
                        <MDBCol>
                            <Design design={items} ind={i} />
                        </MDBCol>
                    ))}
                </MDBRow>
        </div>
    )
}
