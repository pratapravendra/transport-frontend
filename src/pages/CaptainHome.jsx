// import React, { useRef, useState } from 'react'
// import { Link } from 'react-router-dom'
// import CaptainDetails from '../components/CaptainDetails'
// import RidePopUp from '../components/RidePopUp'
// import logo from "../assets/logo.png"
// import { useGSAP } from '@gsap/react'
// import gsap from 'gsap'
// import ConfirmRidePopUp from '../components/ConfirmRidePopUp'
// import { useEffect, useContext } from 'react'
// import { SocketContext } from '../context/SocketContext'
// import { CaptainDataContext } from '../context/CapatainContext'
// import axios from 'axios'

// const CaptainHome = () => {

//     const [ ridePopupPanel, setRidePopupPanel ] = useState(false)
//     const [ confirmRidePopupPanel, setConfirmRidePopupPanel ] = useState(false)

//     const ridePopupPanelRef = useRef(null)
//     const confirmRidePopupPanelRef = useRef(null)
//     const [ ride, setRide ] = useState(null)

//     const { socket } = useContext(SocketContext)
//     const { captain } = useContext(CaptainDataContext)

//     // useEffect(() => {
//     //     socket.emit('join', {
//     //         userId: captain._id,
//     //         userType: 'captain'
//     //     })
//         useEffect(() => {
//             socket.emit('join', { ...})

//         const updateLocation = () => {
//             if (navigator.geolocation) {
//                 navigator.geolocation.getCurrentPosition(position => {

//                     socket.emit('update-location-captain', {
//                         userId: captain._id,
//                         location: {
//                             ltd: position.coords.latitude,
//                             lng: position.coords.longitude
//                         }
//                     })
//                 })
//             }
//         }

//         const locationInterval = setInterval(updateLocation, 10000)
//         updateLocation()

//         //  return () => clearInterval(locationInterval)
//     }, [])

//     socket.on('new-ride', (data) => {
//         console.log('captain received ride :', data);
//         setRide(data)
//         setRidePopupPanel(true)

//     })

//     async function confirmRide() {

//         const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/confirm`, {

//             rideId: ride._id,
//             captainId: captain._id,


//         }, {
//             headers: {
//                 Authorization: `Bearer ${localStorage.getItem('token')}`
//             }
//         })

//         setRidePopupPanel(false)
//         setConfirmRidePopupPanel(true)

//     }


//     useGSAP(function () {
//         if (ridePopupPanel) {
//             gsap.to(ridePopupPanelRef.current, {
//                 transform: 'translateY(0)'
//             })
//         } else {
//             gsap.to(ridePopupPanelRef.current, {
//                 transform: 'translateY(100%)'
//             })
//         }
//     }, [ ridePopupPanel ])

//     useGSAP(function () {
//         if (confirmRidePopupPanel) {
//             gsap.to(confirmRidePopupPanelRef.current, {
//                 transform: 'translateY(0)'
//             })
//         } else {
//             gsap.to(confirmRidePopupPanelRef.current, {
//                 transform: 'translateY(100%)'
//             })
//         }
//     }, [ confirmRidePopupPanel ])

//     return (
//         <div className='h-screen'>
//             <div className='fixed p-6 top-0 flex items-center justify-between w-screen'>
//                 {/* <img className='w-16' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" /> */}
//                 <img className="w-30 sm:w-24 md:w-30 lg:w-40 ml-0 h-auto"  src={logo} alt="" /> 
//                 <Link to='/captain-home' className=' h-10 w-10 bg-white flex items-center justify-center rounded-full'>
//                     <i className="text-lg font-medium ri-logout-box-r-line"></i>
//                 </Link>
//             </div>
//             <div className='h-3/5'>
//                 <img className='h-full w-full object-cover' src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="" />

//             </div>
//             <div className='h-2/5 p-6'>
//                 <CaptainDetails />
//             </div>
//             <div ref={ridePopupPanelRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12'>
//                 <RidePopUp
//                     ride={ride}
//                     setRidePopupPanel={setRidePopupPanel}
//                     setConfirmRidePopupPanel={setConfirmRidePopupPanel}
//                     confirmRide={confirmRide}
//                 />
//             </div>
//             <div ref={confirmRidePopupPanelRef} className='fixed w-full h-screen z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12'>
//                 <ConfirmRidePopUp
//                     ride={ride}
//                     setConfirmRidePopupPanel={setConfirmRidePopupPanel} setRidePopupPanel={setRidePopupPanel} />
//             </div>
//         </div>
//     )
// }

// export default CaptainHome


// update function
import React, { useRef, useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import CaptainDetails from '../components/CaptainDetails';
import RidePopUp from '../components/RidePopUp';
import ConfirmRidePopUp from '../components/ConfirmRidePopUp';
import logo from '../assets/logo.png';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { SocketContext } from '../context/SocketContext';
import { CaptainDataContext } from '../context/CapatainContext';
import axios from 'axios';

const CaptainHome = () => {
  const [ridePopupPanel, setRidePopupPanel] = useState(false);
  const [confirmRidePopupPanel, setConfirmRidePopupPanel] = useState(false);
  const [ride, setRide] = useState(null);

  const ridePopupPanelRef = useRef(null);
  const confirmRidePopupPanelRef = useRef(null);

  const { socket } = useContext(SocketContext);
  const { captain } = useContext(CaptainDataContext);

  useEffect(() => {
    if (!socket || !captain?._id) return;

    // Join the captain room
    socket.emit('join', {
      userId: captain._id,
      userType: 'captain',
    });

    // Function to emit current location
    const updateLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          socket.emit('update-location-captain', {
            userId: captain._id,
            location: {
              ltd: position.coords.latitude,
              lng: position.coords.longitude,
            },
          });
        });
      }
    };

    // Start updating location
    updateLocation();
    const locationInterval = setInterval(updateLocation, 10000);

    // Listen for new ride
    const handleNewRide = (data) => {
      console.log('🎯 Captain received ride:', data);
      setRide(data);
      setRidePopupPanel(true);
    };

    socket.on('new-ride', handleNewRide);

    // Cleanup
    return () => {
      clearInterval(locationInterval);
      socket.off('new-ride', handleNewRide);
    };
  }, [socket, captain?._id]);

  // Handle ride confirmation
  async function confirmRide() {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/rides/confirm`,
        {
          rideId: ride._id,
          captainId: captain._id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      setRidePopupPanel(false);
      setConfirmRidePopupPanel(true);
    } catch (error) {
      console.error('❌ Error confirming ride:', error);
    }
  }

  // Animate ride popup
  useGSAP(() => {
    if (ridePopupPanel) {
      gsap.to(ridePopupPanelRef.current, {
        transform: 'translateY(0)',
        duration: 0.3,
        ease: 'power3.out',
      });
    } else {
      gsap.to(ridePopupPanelRef.current, {
        transform: 'translateY(100%)',
        duration: 0.3,
        ease: 'power3.in',
      });
    }
  }, [ridePopupPanel]);

  // Animate confirm ride popup
  useGSAP(() => {
    if (confirmRidePopupPanel) {
      gsap.to(confirmRidePopupPanelRef.current, {
        transform: 'translateY(0)',
        duration: 0.3,
        ease: 'power3.out',
      });
    } else {
      gsap.to(confirmRidePopupPanelRef.current, {
        transform: 'translateY(100%)',
        duration: 0.3,
        ease: 'power3.in',
      });
    }
  }, [confirmRidePopupPanel]);

  return (
    <div className="h-screen">
      {/* Top bar */}
      <div className="fixed p-6 top-0 flex items-center justify-between w-screen z-20">
        <img className="w-30 sm:w-24 md:w-30 lg:w-40 ml-0 h-auto" src={logo} alt="Logo" />
        <Link
          to="/captain-home"
          className="h-10 w-10 bg-white flex items-center justify-center rounded-full"
        >
          <i className="text-lg font-medium ri-logout-box-r-line"></i>
        </Link>
      </div>

      {/* Background image */}
      <div className="h-3/5">
        <img
          className="h-full w-full object-cover"
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt="Captain background"
        />
      </div>

      {/* Captain Info */}
      <div className="h-2/5 p-6">
        <CaptainDetails />
      </div>

      {/* Ride popup panel */}
      <div
        ref={ridePopupPanelRef}
        className="fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12"
      >
        <RidePopUp
          ride={ride}
          setRidePopupPanel={setRidePopupPanel}
          setConfirmRidePopupPanel={setConfirmRidePopupPanel}
          confirmRide={confirmRide}
        />
      </div>

      {/* Confirm ride popup panel */}
      <div
        ref={confirmRidePopupPanelRef}
        className="fixed w-full h-screen z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12"
      >
        <ConfirmRidePopUp
          ride={ride}
          setConfirmRidePopupPanel={setConfirmRidePopupPanel}
          setRidePopupPanel={setRidePopupPanel}
        />
      </div>
    </div>
  );
};

export default CaptainHome;
