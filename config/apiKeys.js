window.apiKeys = { 
 
 "Gracenote": {
   "key": "kew4j86k7c8ckcuv6q3sbbsk"
 }

}

//http://developer.tmsapi.com/docs/data_v1_1/Movies/
//http://developer.tmsapi.com/docs/data_v1_1/movies/Movies_playing_in_local_theatres

/*
Sample API Data

*/
// [
//     {
//         "tmsId": "MV010387700000",
//         "rootId": "14565950",
//         "subType": "Feature Film",
//         "title": "Sara and Ayda",
//         "releaseYear": 2017,
//         "releaseDate": "2017",
//         "titleLang": "en",
//         "descriptionLang": "en",
//         "entityType": "Movie",
//         "genres": [
//             "Drama"
//         ],
//         "shortDescription": "Close friends learn how far they're willing to go to support each other.",
//         "longDescription": "Close friends learn how far they're willing to go to support each other.",
//         "topCast": [
//             "Pegah Ahangarani",
//             "Saeed Changizian",
//             "Yaghma Golrouee"
//         ],
//         "directors": [
//             "Maziar Miri"
//         ],
//         "runTime": "PT01H29M",
//         "preferredImage": {
//             "uri": "tvbanners/generic/generic_tvbanners_v5.png"
//         },
//         "showtimes": [
//             {
//                 "theatre": {
//                     "id": "4048",
//                     "name": "Roxie Theater"
//                 },
//                 "dateTime": "2017-10-01T14:00",
//                 "quals": "Digital",
//                 "barg": false,
//                 "ticketURI": "http://www.fandango.com/tms.asp?t=AAFBR&m=177923&d=2017-10-01"
//             }
//         ]
//     },
//     {
//         "tmsId": "MV009017650000",
//         "rootId": "12985336",
//         "subType": "Feature Film",
//         "title": "American Made",
//         "releaseYear": 2017,
//         "releaseDate": "2017-09-29",
//         "titleLang": "en",
//         "descriptionLang": "en",
//         "entityType": "Movie",
//         "genres": [
//             "Comedy drama",
//             "Thriller"
//         ],
//         "longDescription": "Barry Seal, a TWA pilot, is recruited by the CIA to provide reconnaissance on the burgeoning communist threat in Central America and soon finds himself in charge of one of the biggest covert CIA operations in the history of the United States. The operation spawns the birth of the Medellin cartel and almost brings down the Reagan White House.",
//         "shortDescription": "Pilot Barry Seal transports contraband for the CIA and the Medellin cartel in the 1980s.",
//         "topCast": [
//             "Tom Cruise",
//             "Domhnall Gleeson",
//             "Sarah Wright Olsen"
//         ],
//         "directors": [
//             "Doug Liman"
//         ],
//         "officialUrl": "http://www.americanmademovie.net/",
//         "ratings": [
//             {
//                 "body": "Motion Picture Association of America",
//                 "code": "R"
//             }
//         ],
//         "advisories": [
//             "Adult Language",
//             "Adult Situations",
//             "Nudity"
//         ],
//         "runTime": "PT01H55M",
//         "preferredImage": {
//             "width": "240",
//             "height": "360",
//             "uri": "assets/p12985336_v_v5_aa.jpg",
//             "category": "VOD Art",
//             "text": "yes",
//             "primary": "true"
//         },
//         "showtimes": [
//             {
//                 "theatre": {
//                     "id": "7967",
//                     "name": "AMC Van Ness 14"
//                 },
//                 "dateTime": "2017-10-01T11:55",
//                 "quals": "No Passes|Descriptive Video Services|Closed Captioned",
//                 "barg": false,
//                 "ticketURI": "http://www.fandango.com/tms.asp?t=AAGBK&m=164208&d=2017-10-01"
//             },
//             {
//                 "theatre": {
//                     "id": "7967",
//                     "name": "AMC Van Ness 14"
//                 },
//                 "dateTime": "2017-10-01T13:00",
//                 "quals": "No Passes|Descriptive Video Services|Closed Captioned",
//                 "barg": false,
//                 "ticketURI": "http://www.fandango.com/tms.asp?t=AAGBK&m=164208&d=2017-10-01"
//             },
//             {
//                 "theatre": {
//                     "id": "7967",
//                     "name": "AMC Van Ness 14"
//                 },
//                 "dateTime": "2017-10-01T16:00",
//                 "quals": "No Passes|Descriptive Video Services|Closed Captioned",
//                 "barg": false,
//                 "ticketURI": "http://www.fandango.com/tms.asp?t=AAGBK&m=164208&d=2017-10-01"
//             },
//             {
//                 "theatre": {
//                     "id": "7967",
//                     "name": "AMC Van Ness 14"
//                 },
//                 "dateTime": "2017-10-01T19:00",
//                 "quals": "No Passes|Descriptive Video Services|Closed Captioned",
//                 "barg": false,
//                 "ticketURI": "http://www.fandango.com/tms.asp?t=AAGBK&m=164208&d=2017-10-01"
//             },
//             {
//                 "theatre": {
//                     "id": "7967",
//                     "name": "AMC Van Ness 14"
//                 },
//                 "dateTime": "2017-10-01T22:00",
//                 "quals": "No Passes|Descriptive Video Services|Closed Captioned",
//                 "barg": false,
//                 "ticketURI": "http://www.fandango.com/tms.asp?t=AAGBK&m=164208&d=2017-10-01"
//             },
//             {
//                 "theatre": {
//                     "id": "7641",
//                     "name": "AMC Metreon 16"
//                 },
//                 "dateTime": "2017-10-01T12:30",
//                 "quals": "Recliners|No Passes|Reserved Seating|Descriptive Video Services|Closed Captioned",
//                 "barg": false,
//                 "ticketURI": "http://www.fandango.com/tms.asp?t=AANEM&m=164208&d=2017-10-01"
//             },
//             {
//                 "theatre": {
//                     "id": "7641",
//                     "name": "AMC Metreon 16"
//                 },
//                 "dateTime": "2017-10-01T15:45",
//                 "quals": "Recliners|No Passes|Reserved Seating|Descriptive Video Services|Closed Captioned",
//                 "barg": false,
//                 "ticketURI": "http://www.fandango.com/tms.asp?t=AANEM&m=164208&d=2017-10-01"
//             },
//             {
//                 "theatre": {
//                     "id": "7641",
//                     "name": "AMC Metreon 16"
//                 },
//                 "dateTime": "2017-10-01T19:00",
//                 "quals": "Recliners|No Passes|Reserved Seating|Descriptive Video Services|Closed Captioned",
//                 "barg": false,
//                 "ticketURI": "http://www.fandango.com/tms.asp?t=AANEM&m=164208&d=2017-10-01"
//             },
//             {
//                 "theatre": {
//                     "id": "7641",
//                     "name": "AMC Metreon 16"
//                 },
//                 "dateTime": "2017-10-01T22:00",
//                 "quals": "Recliners|No Passes|Reserved Seating|Descriptive Video Services|Closed Captioned",
//                 "barg": false,
//                 "ticketURI": "http://www.fandango.com/tms.asp?t=AANEM&m=164208&d=2017-10-01"
//             },
//             {
//                 "theatre": {
//                     "id": "5802",
//                     "name": "Century 20 Daly City and XD"
//                 },
//                 "dateTime": "2017-10-01T10:30",
//                 "quals": "Digital Cinema",
//                 "barg": false,
//                 "ticketURI": "http://www.fandango.com/tms.asp?t=AAQLT&m=164208&d=2017-10-01"
//             },
//             {
//                 "theatre": {
//                     "id": "5802",
//                     "name": "Century 20 Daly City and XD"
//                 },
//                 "dateTime": "2017-10-01T13:30",
//                 "quals": "Digital Cinema",
//                 "barg": false,
//                 "ticketURI": "http://www.fandango.com/tms.asp?t=AAQLT&m=164208&d=2017-10-01"
//             },
//             {
//                 "theatre": {
//                     "id": "5802",
//                     "name": "Century 20 Daly City and XD"
//                 },
//                 "dateTime": "2017-10-01T16:30",
//                 "quals": "Digital Cinema",
//                 "barg": false,
//                 "ticketURI": "http://www.fandango.com/tms.asp?t=AAQLT&m=164208&d=2017-10-01"
//             },
//             {
//                 "theatre": {
//                     "id": "5802",
//                     "name": "Century 20 Daly City and XD"
//                 },
//                 "dateTime": "2017-10-01T19:50",
//                 "quals": "Digital Cinema",
//                 "barg": false,
//                 "ticketURI": "http://www.fandango.com/tms.asp?t=AAQLT&m=164208&d=2017-10-01"
//             },
//             {
//                 "theatre": {
//                     "id": "5802",
//                     "name": "Century 20 Daly City and XD"
//                 },
//                 "dateTime": "2017-10-01T23:00",
//                 "quals": "Digital Cinema",
//                 "barg": false,
//                 "ticketURI": "http://www.fandango.com/tms.asp?t=AAQLT&m=164208&d=2017-10-01"
//             }
//         ]
//     },
//     {
//         "tmsId": "MV009489920000",
//         "rootId": "13482015",
//         "subType": "Feature Film",
//         "title": "Flatliners",
//         "releaseYear": 2017,
//         "releaseDate": "2017-09-29",
//         "titleLang": "en",
//         "descriptionLang": "en",
//         "entityType": "Movie",
//         "genres": [
//             "Thriller",
//             "Science fiction"
//         ],
//         "longDescription": "Five medical students embark on a daring and dangerous experiment to gain insight into the mystery of what lies beyond the confines of life. The bold adventure begins when they trigger near-death experiences by stopping their hearts for short periods of time. As their trials become more perilous, each must confront the sins from their past while facing the paranormal consequences of journeying to the other side.",
//         "shortDescription": "Five medical students face the consequences of triggering near-death experiences.",
//         "topCast": [
//             "Ellen Page",
//             "Diego Luna",
//             "Nina Dobrev"
//         ],
//         "directors": [
//             "Niels Arden Oplev"
//         ],
//         "officialUrl": "http://www.sonypictures.com/movies/flatliners2017/",
//         "ratings": [
//             {
//                 "body": "Motion Picture Association of America",
//                 "code": "PG-13"
//             }
//         ],
//         "advisories": [
//             "Adult Language",
//             "Adult Situations",
//             "Violence"
//         ],
//         "runTime": "PT01H48M",
//         "preferredImage": {
//             "width": "240",
//             "height": "360",
//             "caption": {
//                 "content": "Flatliners (2017)",
//                 "lang": "en"
//             },
//             "uri": "assets/p13482015_p_v5_aa.jpg",
//             "category": "Poster Art",
//             "text": "yes",
//             "primary": "true"
//         },
//         "showtimes": [
//             {
//                 "theatre": {
//                     "id": "7967",
//                     "name": "AMC Van Ness 14"
//                 },
//                 "dateTime": "2017-10-01T11:55",
//                 "quals": "No Passes|Descriptive Video Services|Closed Captioned",
//                 "barg": false,
//                 "ticketURI": "http://www.fandango.com/tms.asp?t=AAGBK&m=168935&d=2017-10-01"
//             },
//             {
//                 "theatre": {
//                     "id": "7967",
//                     "name": "AMC Van Ness 14"
//                 },
//                 "dateTime": "2017-10-01T13:00",
//                 "quals": "No Passes|Descriptive Video Services|Closed Captioned",
//                 "barg": false,
//                 "ticketURI": "http://www.fandango.com/tms.asp?t=AAGBK&m=168935&d=2017-10-01"
//             },
//             {
//                 "theatre": {
//                     "id": "7967",
//                     "name": "AMC Van Ness 14"
//                 },
//                 "dateTime": "2017-10-01T15:45",
//                 "quals": "No Passes|Descriptive Video Services|Closed Captioned",
//                 "barg": false,
//                 "ticketURI": "http://www.fandango.com/tms.asp?t=AAGBK&m=168935&d=2017-10-01"
//             },
//             {
//                 "theatre": {
//                     "id": "7967",
//                     "name": "AMC Van Ness 14"
//                 },
//                 "dateTime": "2017-10-01T18:45",
//                 "quals": "No Passes|Descriptive Video Services|Closed Captioned",
//                 "barg": false,
//                 "ticketURI": "http://www.fandango.com/tms.asp?t=AAGBK&m=168935&d=2017-10-01"
//             },
//             {
//                 "theatre": {
//                     "id": "7967",
//                     "name": "AMC Van Ness 14"
//                 },
//                 "dateTime": "2017-10-01T21:45",
//                 "quals": "No Passes|Descriptive Video Services|Closed Captioned",
//                 "barg": false,
//                 "ticketURI": "http://www.fandango.com/tms.asp?t=AAGBK&m=168935&d=2017-10-01"
//             },
//             {
//                 "theatre": {
//                     "id": "7641",
//                     "name": "AMC Metreon 16"
//                 },
//                 "dateTime": "2017-10-01T12:15",
//                 "quals": "Recliners|No Passes|Reserved Seating|Descriptive Video Services|Closed Captioned",
//                 "barg": false,
//                 "ticketURI": "http://www.fandango.com/tms.asp?t=AANEM&m=168935&d=2017-10-01"
//             },
//             {
//                 "theatre": {
//                     "id": "7641",
//                     "name": "AMC Metreon 16"
//                 },
//                 "dateTime": "2017-10-01T15:15",
//                 "quals": "Recliners|No Passes|Reserved Seating|Descriptive Video Services|Closed Captioned",
//                 "barg": false,
//                 "ticketURI": "http://www.fandango.com/tms.asp?t=AANEM&m=168935&d=2017-10-01"
//             },
//             {
//                 "theatre": {
//                     "id": "7641",
//                     "name": "AMC Metreon 16"
//                 },
//                 "dateTime": "2017-10-01T18:15",
//                 "quals": "Recliners|No Passes|Reserved Seating|Descriptive Video Services|Closed Captioned",
//                 "barg": false,
//                 "ticketURI": "http://www.fandango.com/tms.asp?t=AANEM&m=168935&d=2017-10-01"
//             },
//             {
//                 "theatre": {
//                     "id": "7641",
//                     "name": "AMC Metreon 16"
//                 },
//                 "dateTime": "2017-10-01T21:15",
//                 "quals": "Recliners|No Passes|Reserved Seating|Descriptive Video Services|Closed Captioned",
//                 "barg": false,
//                 "ticketURI": "http://www.fandango.com/tms.asp?t=AANEM&m=168935&d=2017-10-01"
//             }
//         ]
//     },
//     {
//         "tmsId": "EV000008077637",
//         "rootId": "14533291",
//         "subType": "Theatre Event",
//         "title": "Top Knot Detective",
//         "titleLang": "en",
//         "entityType": "Movie",
//         "preferredImage": {
//             "uri": "tvbanners/generic/generic_tvbanners_v5.png"
//         },
//         "showtimes": [
//             {
//                 "theatre": {
//                     "id": "11184",
//                     "name": "Alamo Drafthouse New Mission"
//                 },
//                 "dateTime": "2017-10-01T15:45",
//                 "barg": false,
//                 "ticketURI": "http://www.fandango.com/tms.asp?t=AAXPV&m=177527&d=2017-10-01"
//             }
//         ]
//     },
//     {
//         "tmsId": "MV010297690000",
//         "rootId": "14454336",
//         "subType": "Feature Film",
//         "title": "Brawl in Cell Block 99",
//         "releaseYear": 2017,
//         "releaseDate": "2017-10-06",
//         "titleLang": "en",
//         "descriptionLang": "en",
//         "entityType": "Movie",
//         "genres": [
//             "Action",
//             "Thriller"
//         ],
//         "longDescription": "A desperate former boxer takes work as a drug courier and winds up in a jail where his enemies force him to commit acts of violence.",
//         "shortDescription": "A boxer-turned-drug runner lands in a prison where he's forced to commit acts of violence.",
//         "topCast": [
//             "Vince Vaughn",
//             "Don Johnson",
//             "Udo Kier"
//         ],
//         "directors": [
//             "S. Craig Zahler"
//         ],
//         "runTime": "PT02H12M",
//         "preferredImage": {
//             "uri": "tvbanners/generic/generic_tvbanners_v5.png"
//         },
//         "showtimes": [
//             {
//                 "theatre": {
//                     "id": "11184",
//                     "name": "Alamo Drafthouse New Mission"
//                 },
//                 "dateTime": "2017-10-01T19:00",
//                 "barg": false,
//                 "ticketURI": "http://www.fandango.com/tms.asp?t=AAXPV&m=177522&d=2017-10-01"
//             }
//         ]
//     },
//     {
//         "tmsId": "MV002753950000",
//         "rootId": "8033989",
//         "subType": "Feature Film",
//         "title": "Tangled",
//         "releaseYear": 2010,
//         "releaseDate": "2010-11-24",
//         "titleLang": "en",
//         "descriptionLang": "en",
//         "entityType": "Movie",
//         "genres": [
//             "Animated",
//             "Adventure",
//             "Children",
//             "Fantasy",
//             "Musical comedy"
//         ],
//         "audience": "Children",
//         "longDescription": "When the kingdom's most-wanted bandit, Flynn Rider (Zachary Levi), hides in a convenient tower, he immediately becomes a captive of Rapunzel (Mandy Moore), the spire's longtime resident. Crowned with 70 feet of magical golden hair, she has been locked away for years and desperately wants freedom. The feisty teenager strikes a deal with Flynn, and together they begin a whirlwind adventure.",
//         "shortDescription": "Long-haired Rapunzel strikes a deal with a charming bandit to help her escape from a prison tower.",
//         "topCast": [
//             "Mandy Moore",
//             "Zachary Levi",
//             "Donna Murphy"
//         ],
//         "directors": [
//             "Nathan Greno",
//             "Byron Howard"
//         ],
//         "officialUrl": "http://disney.go.com/disneypictures/tangled/#/video/",
//         "qualityRating": {
//             "ratingsBody": "TMS",
//             "value": "3"
//         },
//         "ratings": [
//             {
//                 "body": "Motion Picture Association of America",
//                 "code": "PG"
//             }
//         ],
//         "advisories": [
//             "Adult Situations",
//             "Mild Violence"
//         ],
//         "runTime": "PT01H41M",
//         "animation": "Animated",
//         "preferredImage": {
//             "width": "240",
//             "height": "360",
//             "uri": "assets/p8033989_v_v5_aa.jpg",
//             "category": "VOD Art",
//             "text": "yes",
//             "primary": "true"
//         },
//         "showtimes": [
//             {
//                 "theatre": {
//                     "id": "7641",
//                     "name": "AMC Metreon 16"
//                 },
//                 "dateTime": "2017-10-01T14:00",
//                 "quals": "Reserved Seating|Recliners|No Passes",
//                 "barg": false,
//                 "ticketURI": "http://www.fandango.com/tms.asp?t=AANEM&m=89061&d=2017-10-01"
//             },
//             {
//                 "theatre": {
//                     "id": "7641",
//                     "name": "AMC Metreon 16"
//                 },
//                 "dateTime": "2017-10-01T18:00",
//                 "quals": "Recliners|No Passes|Reserved Seating",
//                 "barg": false,
//                 "ticketURI": "http://www.fandango.com/tms.asp?t=AANEM&m=89061&d=2017-10-01"
//             }
//         ]
//     },
//     {
//         "tmsId": "MV000038320000",
//         "rootId": "2352",
//         "subType": "Feature Film",
//         "title": "The Tingler",
//         "releaseYear": 1959,
//         "releaseDate": "1959-07-29",
//         "titleLang": "en",
//         "descriptionLang": "en",
//         "entityType": "Movie",
//         "genres": [
//             "Horror"
//         ],
//         "longDescription": "Dr. Warren Chapin (Vincent Price) has made a surprising discovery -- the spine-chilling sensation that people get when scared is due to a parasite that he dubs the \"tingler.\" Chapin concludes that in extreme circumstances, prolonged fear can cause the creature to damage a person's spine and even cause death if the victim can't scream, a theory that Oliver Higgins (Philip Coolidge) uses to deadly effect on his wife (Judith Evelyn). Soon the tingler that killed the woman is on the loose.",
//         "shortDescription": "A pathologist discovers that people die of fright because of an organism on the spinal cord.",
//         "topCast": [
//             "Vincent Price",
//             "Judith Evelyn",
//             "Darryl Hickman"
//         ],
//         "directors": [
//             "William Castle"
//         ],
//         "qualityRating": {
//             "ratingsBody": "TMS",
//             "value": "2"
//         },
//         "advisories": [
//             "Adult Situations",
//             "Violence"
//         ],
//         "runTime": "PT01H22M",
//         "preferredImage": {
//             "width": "240",
//             "height": "360",
//             "uri": "assets/p2352_v_v5_aa.jpg",
//             "category": "VOD Art",
//             "text": "yes",
//             "primary": "true"
//         },
//         "showtimes": [
//             {
//                 "theatre": {
//                     "id": "5802",
//                     "name": "Century 20 Daly City and XD"
//                 },
//                 "dateTime": "2017-10-01T14:00",
//                 "quals": "Digital Cinema",
//                 "barg": false,
//                 "ticketURI": "http://www.fandango.com/tms.asp?t=AAQLT&m=11254&d=2017-10-01"
//             }
//         ]
//     }
// ]