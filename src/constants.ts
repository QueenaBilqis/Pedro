import { Product, User, Order } from './types';

export const MOCK_USER: User = {
    name: "Alexandrea Smith",
    email: "alex.smith@example.com",
    tier: "Platinum",
    points: 2450,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBHahEJcZ9Eo4yTw9LamIbGzwTac15L8hjpbM_KmexT-vvGAfrDzbyK04qKRm5fcQscsUFGPW80mrRamsbRuZe4BdriwgkNkhOoxhEZevFcZT9MqqsQQ0-q6MBPRAdR8_4Am-Yzpb13dmFV0nLyt7A79-XztULJxVdY8NJ5nyhUpX8w8NLdUCmV2BZ0N015H2uACxP1OVO3-yNYzASIKwHFenUG9NBUB0d3plxlWYZzaI66L-fB4ce1CPNKn-wjKgtCsFSaT4zWvHoa"
};

export const MOCK_ORDERS: Order[] = [
    { id: "#PED-90231", date: "Oct 24, 2023", amount: 345.00, status: "In Transit", items: ["Quilted Shoulder Bag"] },
    { id: "#PED-88120", date: "Sep 12, 2023", amount: 120.00, status: "Delivered", items: ["Envelope Clutch"] },
];

export const PRODUCTS: Product[] = [
    {
        id: "1",
        name: "Sabrina",
        subtitle: "Liquid Chrome Edition",
        price: 220,
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCPGNdZRrIHJ9F7ndc2c6cefGjKI13IA8WvHou7kBy5qp0KXs6M__I-iQjR2vb2gLiH-qwGC0Y8s6uW3czFzrjwxqb_bYWZnXKhOWMiFv-0pX-7ZR1s7B6PFqBQzMVV_Y-EC_jrVsr5ohn2MSXP_uxlo10CU9sd87-N85u1xeYHHa3b4Rbd8ogwkTJ4igEOyuktJzHG0T3DsY8A4JVHxOL1fT6Lz7tgl2oqt74QhyZVqUeGMwbXr8-0E7QaVFs_4k47TYV5jL2Rkdhl",
        images: [
             "https://lh3.googleusercontent.com/aida-public/AB6AXuA9JvZumsAkF0nwPFMwRsdUdnMhCpUBT1dmD7ctdiB4dQRqHHxQnxuxzPXfB9VjB5q5hTil6LugUnAqMNqVIm1Z3wKTGG0r7ABTG2CvX4ZIOGi3Zdwy570XYXba6sLVqNYV03pqj78HdU6m527Y7cLGyEHTdUlUDA1Ks-NYM5eFkkSUKWAjtwAdYxO3rldH6gurJvUZCGsw46wUTUy9NdmrjpNyCQxK5oy4EavEz8V06oHp8e_aWPFLeYt90LyMJS1odEUwvUKtaDWJ",
             "https://lh3.googleusercontent.com/aida-public/AB6AXuBUrulw9gWtR7YzCUwE51ht8H4GKJA6k7Ry5BBcJgC_eUGnQNwbFkoGGS1lPK_rRIfB2OUlUGtFqABI8AMgW71j7alAgzmOhIhrcmEjUGmsp4fRdixsy8ENFk6Xid0DB270Y-V1qby-KYdCYUbHdAmh9eIWuU0GTZ9cH1Wz5CdA1k2V8uGhYqRlPsNrh-Yzg2f4mjyPCGrY5Fp8MIiA7rScRn9fOLSHjLYMV7dLl0mUe88iGWsXuKaHTsj2MEdLSDLYhjTgxnIZLby9",
             "https://lh3.googleusercontent.com/aida-public/AB6AXuBRWMfN4tVyoRxeDP5Rjg44wNoM-jFbmAaUb4U-Qk7icfrtwrXQEL7hbeR3oJj8QPMyCxJXRYC3CDrUH6ZwrP9z3oMisDrAWsJggED_F0CPZ5xT4N54dSn6voN22UBgG3RH2XVdOeI7XdSr9GfAblDTSCd47TAx4ReurPa9uMzjUVulCXE7u7ovwGErThnlXoTQk7zzAe4Jh_C2divWrxYobWLrml3LNJcHh0iaxbnawLeXGlbAl9GWrWq3YTpR7fvr5gY_Opthlzmw"
        ],
        description: "A fusion of futuristic architecture and organic silhouettes. The Sabrina features a high-gloss metallic finish with integrated hardware for the modern visionary.",
        category: "Handbags",
        isEco: true,
        video: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4"
    },
    {
        id: "2",
        name: "Brielle",
        subtitle: "Snow Matrix",
        price: 200,
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCJePDcQMxIUl8X9gDVc4W2tPkbuX4HCG-WW_ilX_AHwqW4TXsTBatQns9Iun-6O_j8ywwgtJTIBIk_HZAUjBdG0nmsCTrf8lnR4xwHbyiM_Zanoa5869OmBl-6hxz_Ego882g7Sf68ay2Vz3m_ieMwtKLBJfy_e7p8228g0o6B9X1LOagkmpixCbrGzYoZUxyDjEmSJMpG0EfJ-WcB2V5E7gP9UDONJYv-EcFaR6SSeUCUWDFV5ROrE-5hHe8M6YrUcFJHEut5YsT-",
        images: [],
        description: "Minimalist perfection for the digital age. The Brielle offers a clean aesthetic with smart storage solutions.",
        category: "Handbags",
        isEco: true
    },
    {
        id: "3",
        name: "Naomi",
        subtitle: "Cyber Rose",
        price: 235,
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCGRq6JbnI6dX-7KqA-5bJ3ei4YnnakpPOzmvKxZaN6q2XalobxABnrOOolRx5mPKe9dEOd5wrc-mhQ5JX8CAi_cKufwf0SMIrO_dyEoQeUcKZjM24BvJQBR5AgEGWJLDQTXlRTPmiX6-wRLAaMEyaciSq-wqbsRo7gh0sADvSuOvNrp6QMmEIEP4q-YdKfIxLX-cb99NISKzhUQSpuZTYGHmS_PjnCYS6YEglxzD4USv83oJXINyhiD-623gyAntZy5XOH9MWpuNBv",
        images: [],
        description: "Bold and vibrant. The Naomi in Cyber Rose is a statement piece for those who dare to stand out.",
        category: "Handbags",
        isNew: true,
        isEco: true
    },
    {
        id: "4",
        name: "Lumi",
        subtitle: "Dark Matter",
        price: 310,
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBSds1xHFcTNCox-yqKqKMVqO2Rg_5Uq7OskM_59JR2Fjr7G9JIJbSQSvOIlN4Sc5KSlPv_O7bAz-60DlXQIxQ7rr2T5DzX_5ohuA7z1uL9qLRhK1H-B7W51FOm-ClcRSN0tR4AMlNr0sDhbfbilDIHKTRF6JA_CQpRpOtECsrKdnkZBttnXQCMiJCucd4iiuRLMpiEB9ON_827BvnWCCKDiyQHDiAWpnwbra90rTfFnU_dAJSxn3j_FSsaCzs2FQUWyrlVrm5s1T-p",
        images: [],
        description: "Deep, mysterious, and elegant. The Lumi clutch mimics the void of space with its absolute black finish.",
        category: "Accessories"
    },
    {
        id: "5",
        name: "Nova",
        subtitle: "Prism Shift",
        price: 450,
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuClqXPujho7TcKcf5XS5dURIpTsFcqSbj9pPryrpBtosDuvzQ0mqUCxPLmgwXGqFbiOMeaN_JPg1cNdvbRNcssdFwZev_rg2PQCH2WFp7boFQz2X0V3Kie_NhqU3rDnDEPyaGqcVlhRO6T0xspbQ87Se39l38DMdn_DFiYHMqbw-I8eJvWK-1u84_Ibsu3lr7kpygztY-X6wEGkaFJZsNkhIEO1WmdupPwFP_pZjOOQqU2uIAtJocIewp8s0dKLvnPdA7FGGMjbvCsj",
        images: [],
        description: "Iridescent surfaces that shift with your perspective. Nova is true futuristic luxury.",
        category: "Handbags",
        isSoldOut: true
    },
    {
        id: "6",
        name: "Luna",
        subtitle: "Deep Space",
        price: 195,
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAGqXFHBwmxZX06Ijp5VDkXRTLUMaLwvV7w_TbaicUMsqw7-6DsuQPxZ-Ogh59yqJgTiBbkiIaa_keJP6M7XrmmCItiFwSvjjB24HVscu_e58xi3O_xOAUiyrL9xR4QY0OuKC74TIF7o1OASzDrK52-R3rTpNP43KsIyixnnacXwzsPnsYsgHHEcvsz556w9UyOedeBx7EZ0HFh0pATc1F_C4o5VqE8aNHDEMPNl5lf2UhdgnKYkKH2Tz4gCpELT4BTkOaqjxeQNzRj",
        images: [],
        description: "Simple, effective, and timeless. The Luna tote is your daily driver for intergalactic travel.",
        category: "Handbags"
    },
     {
        id: "7",
        name: "Aura Mini",
        subtitle: "White Light",
        price: 620,
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBHyplsfRMMqXdUPBbjJ9qfIZBFZiYNnyj1hRKN0A21iNLaQcy7LL3KOmRZ2A0qLGRAk57nGKwqB_RvHb2UpL0SLSnhvUKAZgr0cPlEdkv84FHKxR9AVZ-9Ie6PA9uLEICzWuoCEgxVBKNb5A19APpzySESX7yoJmlJQtub_w9Q23J89MHN5AN2Hg4-DAencKz3zVSKwxB7HvDKGg0IguY9Of4yWDL2yDsZIWkbTKXyE7bXGkbgXBz3xw17DbY-qk55oKc9Z5zLmEjq",
        images: [],
        description: "Compact luminosity.",
        category: "Accessories"
    }
];