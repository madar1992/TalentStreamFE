import React from 'react'
import { useState, useEffect } from 'react';
import axios from "axios";
import { useUserContext } from '../common/UserProvider';
import ApplicantAPIService,{ apiUrl } from '../../services/ApplicantAPIService';
import { useNavigate } from "react-router-dom";
import { Link, useLocation } from 'react-router-dom';
import Postjobimg from '../../images/user/avatar/Postjobimg.png';



function RecruiterDashboard() {
    const [token, setToken] = useState('');
    const { user } = useUserContext();
    const [contActiveJobs, setActiveCountJobs] = useState(0);
    const [contJobApplicants, setJobApplicants] = useState(0);
    const [contJobHires, setJobHires] = useState(0);
    const [countInterviews, setInterviews] = useState(0);
    const [applicants, setApplicants] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();
   
    useEffect(() => {
        const jwtToken = localStorage.getItem('jwtToken');
        if (jwtToken) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${jwtToken}`;
        }
        axios
            .get(`${apiUrl}/job/recruiterscountjobs/${user.id}`)
            .then((response) => {
                setActiveCountJobs(response.data);
            })
            .catch((error) => {
                console.error('Error fetching team members:', error);
            });
    }, [user.id]); 
    useEffect(() => {
        const jwtToken = localStorage.getItem('jwtToken');
        if (jwtToken) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${jwtToken}`;
        }
        axios
            .get(`${apiUrl}/applyjob/recruiters/applyjobapplicantscount/${user.id}`)
            .then((response) => {
                setJobApplicants(response.data);
            })
            .catch((error) => {
                console.error('Error fetching team members:', error);
            });
    }, [user.id]);

    useEffect(() => {
        const jwtToken = localStorage.getItem('jwtToken');
        if (jwtToken) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${jwtToken}`;
        }
        axios
            .get(`${apiUrl}/applyjob/recruiters/selected/count`)
            .then((response) => {
                setJobHires(response.data);
            })
            .catch((error) => {
                console.error('Error fetching team members:', error);
            });
    }, [user.id]);

    useEffect(() => {
        const jwtToken = localStorage.getItem('jwtToken');
        if (jwtToken) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${jwtToken}`;
        }
        axios
            .get(`${apiUrl}/applyjob/recruiters/countShortlistedAndInterviewed/${user.id}`)
            .then((response) => {
                setInterviews(response.data);
            })
            .catch((error) => {
                console.error('Error fetching team members:', error);
            });
    }, [user.id]);

    useEffect(() => {
        const storedToken = localStorage.getItem('jwtToken');
        if (storedToken) {
          setToken(storedToken);
        }
      }, []);

      useEffect(() => {
        const jwtToken = localStorage.getItem('jwtToken');
        if (jwtToken) {
          axios.defaults.headers.common['Authorization'] = `Bearer ${jwtToken}`;
        }
        axios
        .get(`${apiUrl}/applyjob/recruiter/${user.id}/interviews/Interviewing`)
          .then((response) => {
            setApplicants(response.data);
          })
          .catch((error) => {
            console.error('Error fetching job details:', error);
          });
      }, []);

      const todayApplicants = applicants.filter(applicant => {
        const [year, month, day, hour, minute] = applicant.timeAndDate;
        const interviewTimestamp = new Date(year, month - 1, day, hour, minute).getTime();
        const todayTimestamp = new Date().setHours(0, 0, 0, 0);
        return interviewTimestamp >= todayTimestamp && interviewTimestamp < todayTimestamp + 24 * 60 * 60 * 1000;
      });
      const jobopenings = () => {
    
        navigate("/recruiter-jobopenings");
      };
      const allapplicants = () => {
        navigate("/recruiter-allapplicants");
      };
      const interviews = () => {
        navigate("/recruiter-applicantinterviews");
      };
      const Postajob = () => {
        navigate("/recruiter-postjob");
      };

  return (
    <div>
<div className="dashboard__content">
  <section className="page-title-dashboard">
    <div className="themes-container">
      <div className="row">
        <div className="col-lg-12 col-md-12 ">
          <div className="title-dashboard">
            <div className="title-dash flex2">Dashboard</div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section className="flat-icon-dashboard">
    <div className="themes-container">
      <div className="row">
        <div className="col-lg-12 col-md-12 ">
          <div className="wrap-icon widget-counter">
            <div className="box-icon wrap-counter flex" onClick={jobopenings}>
              <div className="icon style1">
                <span className="icon-bag">
                  <svg
                    width={49}
                    height={43}
                    viewBox="0 0 49 43"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M25.6562 29.5312C26.4328 29.5312 27.0625 28.9016 27.0625 28.125V22.5C27.0625 21.7235 26.4331 21.0938 25.6562 21.0938H22.8438C22.0672 21.0938 21.4375 21.7232 21.4375 22.5V28.125C21.4375 28.9015 22.0671 29.5312 22.8438 29.5312H25.6562Z"
                      fill="#504CFE"
                    />
                    <path
                      d="M44.0312 5.625H34.0938C34.0938 5.34178 34.0938 3.93553 34.0938 4.21875C34.0938 1.89244 32.2014 0 29.875 0C29.5697 0 18.2073 0 18.625 0C16.2987 0 14.4062 1.89234 14.4062 4.21875C14.4062 4.50197 14.4062 5.90822 14.4062 5.625H4.46875C2.14244 5.625 0.25 7.51734 0.25 9.84375C0.25 12.5978 0.5875 15.0097 1.25763 17.0652C1.92775 19.1207 2.93059 20.8198 4.26137 22.1484C6.50078 24.3848 9.35322 25.3125 12.5561 25.3125H18.625C18.625 25.0293 18.625 22.2168 18.625 22.5C18.625 20.1737 20.5173 18.2812 22.8438 18.2812C23.127 18.2812 25.9395 18.2812 25.6562 18.2812C27.9826 18.2812 29.875 20.1736 29.875 22.5C29.875 22.7832 29.875 25.5957 29.875 25.3125H32.9996C35.799 25.1962 40.378 26.0474 44.2372 22.2061C45.5687 20.8808 46.5718 19.1787 47.2422 17.1136C47.9126 15.0485 48.25 12.6205 48.25 9.84375C48.25 7.51744 46.3577 5.625 44.0312 5.625ZM17.2188 4.21875C17.2188 3.44287 17.849 2.8125 18.625 2.8125H29.875C30.6509 2.8125 31.2812 3.44278 31.2812 4.21875C31.2812 4.50197 31.2812 5.90822 31.2812 5.625H17.2188C17.2188 5.34178 17.2188 3.93553 17.2188 4.21875Z"
                      fill="#504CFE"
                    />
                    <path
                      d="M33.038 28.1219H29.875C29.875 30.4482 27.9827 32.3406 25.6562 32.3406C25.373 32.3406 22.5605 32.3406 22.8438 32.3406C20.5174 32.3406 18.625 30.4483 18.625 28.1219C18.3037 28.1219 12.2211 28.1219 12.5684 28.1219C8.55737 28.1219 5.03434 26.8911 2.27416 24.1353C1.49444 23.3568 0.828625 22.4804 0.25 21.543V40.7781C0.25 41.5554 0.878969 42.1844 1.65625 42.1844H46.8438C47.621 42.1844 48.25 41.5554 48.25 40.7781V21.6008C47.6636 22.5525 46.9951 23.4269 46.2216 24.197C41.7843 28.6111 37.0588 27.9319 33.038 28.1219Z"
                      fill="#504CFE"
                    />
                  </svg>
                </span>
              </div>
              <div className="content">
              <h3>{contActiveJobs}</h3>
              <h4
        className="title-count"
        onClick={jobopenings}
        style={{ cursor: "pointer" }}
      >
        Active Jobs
      </h4>
                {/* <h4 className="title-count">Active Jobs</h4> */}
              </div>
            </div>
            <div className="box-icon wrap-counter flex" onClick={allapplicants}>
              <div className="icon style2">
                <span className="icon-bag">
                  <svg
                    width={45}
                    height={45}
                    viewBox="0 0 45 45"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M27.3902 35.2336C32.1362 35.2336 35.9836 31.3862 35.9836 26.6402C35.9836 21.8943 32.1362 18.0469 27.3902 18.0469C22.6443 18.0469 18.7969 21.8943 18.7969 26.6402C18.7969 31.3862 22.6443 35.2336 27.3902 35.2336Z"
                      fill="#EB4D4D"
                    />
                    <path
                      d="M43.9986 39.6008L36.9017 32.5039C35.9862 33.9834 34.7354 35.2343 33.2559 36.1498L40.3528 43.2467C41.3596 44.2535 42.9919 44.2535 43.9986 43.2467C45.0054 42.2399 45.0054 40.6076 43.9986 39.6008Z"
                      fill="#EB4D4D"
                    />
                    <path
                      d="M9.34021 3.17984C9.34021 2.28893 8.26307 1.84277 7.6331 2.47273L3.20906 6.89677C2.5791 7.52674 3.02526 8.60388 3.91617 8.60388H8.34021C8.89249 8.60388 9.34021 8.15617 9.34021 7.60388V3.17984Z"
                      fill="#EB4D4D"
                    />
                    <path
                      d="M8.48438 22.3436H17.0782C17.7802 20.6653 18.8801 19.1935 20.2597 18.0469H8.48438V22.3436Z"
                      fill="#EB4D4D"
                    />
                    <path
                      d="M16.3503 24.9207H7.19502C6.48314 24.9207 5.90601 24.3436 5.90601 23.6317V16.757C5.90601 16.0452 6.48314 15.468 7.19502 15.468H27.3894C29.98 15.468 32.3671 16.3545 34.2641 17.8398V3.86701C34.2641 1.73474 32.5293 0 30.3971 0H11.9214V9.88236C11.9214 10.5942 11.3442 11.1714 10.6324 11.1714H0.75V40.131C0.75 42.2632 2.48474 43.998 4.61701 43.998H30.3971C32.317 43.998 33.9138 42.5913 34.213 40.7548L30.7516 37.2933C29.6899 37.629 28.5606 37.8108 27.3894 37.8108C24.6812 37.8108 22.1952 36.8418 20.2593 35.2328H7.19502C6.48314 35.2328 5.90601 34.6556 5.90601 33.9437C5.90601 33.2319 6.48314 32.6547 7.19502 32.6547H17.9795C17.4687 31.8585 17.0569 30.9932 16.7599 30.0767H7.19502C6.48314 30.0767 5.90601 29.4996 5.90601 28.7877C5.90601 28.0759 6.48314 27.4987 7.19502 27.4987H16.2508C16.1331 26.2121 16.3503 24.9207 16.3503 24.9207ZM27.8191 12.89H15.7884C15.0765 12.89 14.4994 12.3129 14.4994 11.601C14.4994 10.8892 15.0765 10.312 15.7884 10.312H27.8191C28.5309 10.312 29.1081 10.8892 29.1081 11.601C29.1081 12.3129 28.5309 12.89 27.8191 12.89ZM27.8191 7.73402H15.7884C15.0765 7.73402 14.4994 7.15689 14.4994 6.44502C14.4994 5.73314 15.0765 5.15601 15.7884 5.15601H27.8191C28.5309 5.15601 29.1081 5.73314 29.1081 6.44502C29.1081 7.15689 28.5309 7.73402 27.8191 7.73402Z"
                      fill="#EB4D4D"
                    />
                  </svg>
                </span>
              </div>
              <div className="content">
              <h3>{contJobApplicants}</h3>
              <h4
        className="title-count"
        onClick={allapplicants}
        style={{ cursor: "pointer" }}
      >
        Applicants
      </h4>
                {/* <h4 className="title-count">Applicants</h4> */}
              </div>
            </div>
            {/* <div className="box-icon wrap-counter flex">
              <div className="icon style3">
                <span className="icon-bag">
                  <svg
                    width={38}
                    height={43}
                    viewBox="0 0 38 43"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M31.0769 25.4044H21.8774C22.6365 23.1266 23.04 21.2093 23.1065 19.5746C23.2634 15.718 21.4425 14.1916 19.8873 13.5894C19.8223 13.5638 19.7546 13.5457 19.6855 13.5352C18.4805 13.3448 18.0515 13.9118 17.7672 14.5524L17.7299 14.6364C17.6883 14.7285 17.6611 14.8264 17.6493 14.9267C17.2647 18.2166 15.8599 21.3036 13.6318 23.7546V42.134C13.8804 42.225 14.1342 42.3008 14.392 42.3608C14.4618 42.3773 14.5332 42.3861 14.6049 42.3871C15.375 42.3953 16.293 42.3995 17.3517 42.3995C18.4078 42.3995 19.6035 42.3953 20.9306 42.3871H29.5972C30.1039 42.3872 30.6016 42.2527 31.0392 41.9973C31.4769 41.7419 31.8389 41.3749 32.0882 40.9337C32.3374 40.4925 32.465 39.993 32.4579 39.4863C32.4507 38.9796 32.3091 38.4839 32.0475 38.0499C32.6259 37.6118 33.0159 36.9699 33.1383 36.2546C33.2607 35.5394 33.1063 34.8043 32.7065 34.1987C33.2678 33.7227 33.6238 33.0485 33.7004 32.3165C33.7769 31.5845 33.5681 30.8512 33.1174 30.2694C33.5127 29.8675 33.7803 29.3578 33.8867 28.8042C33.9931 28.2507 33.9336 27.6781 33.7156 27.1583C33.4975 26.6385 33.1307 26.1947 32.6613 25.8827C32.1918 25.5708 31.6406 25.4045 31.0769 25.4049V25.4044ZM11.7085 8.90458C11.6502 8.72507 11.5416 8.56606 11.3956 8.44648C11.2496 8.3269 11.0723 8.25177 10.8849 8.23003L8.19749 7.92085L7.07365 5.46217C6.99554 5.2902 6.86957 5.14436 6.71079 5.04209C6.55201 4.93981 6.36713 4.88542 6.17826 4.88542C5.98939 4.88542 5.80451 4.93981 5.64573 5.04209C5.48695 5.14436 5.36098 5.2902 5.28288 5.46217L4.15903 7.92085L1.47173 8.23003C1.28425 8.25155 1.1069 8.32651 0.960823 8.44597C0.814741 8.56544 0.706076 8.72437 0.647772 8.90385C0.589467 9.08333 0.58398 9.27579 0.631963 9.45829C0.679947 9.6408 0.779379 9.80567 0.918417 9.93327L2.91033 11.7626L2.37408 14.4136C2.33704 14.5985 2.3538 14.7901 2.42237 14.9657C2.49094 15.1413 2.60845 15.2935 2.76094 15.4044C2.91344 15.5152 3.09453 15.5799 3.28272 15.5909C3.47092 15.602 3.65832 15.5587 3.8227 15.4664L6.17801 14.1366L8.53382 15.4664C8.69815 15.5592 8.88566 15.6027 9.07403 15.5919C9.26241 15.5811 9.4437 15.5164 9.59634 15.4055C9.74898 15.2946 9.86652 15.1421 9.93497 14.9663C10.0034 14.7904 10.0199 14.5986 9.98244 14.4137L9.44619 11.7627L11.4381 9.93335C11.577 9.80582 11.6763 9.64106 11.7242 9.45868C11.7722 9.2763 11.7667 9.084 11.7084 8.90466L11.7085 8.90458ZM37.3546 8.90458C37.4129 9.0839 37.4185 9.2762 37.3706 9.45858C37.3227 9.64095 37.2234 9.80572 37.0845 9.93327L35.0924 11.7626L35.6287 14.4136C35.6661 14.5986 35.6496 14.7903 35.5812 14.9662C35.5127 15.142 35.3952 15.2944 35.2426 15.4053C35.09 15.5162 34.9087 15.581 34.7203 15.5918C34.532 15.6026 34.3445 15.5591 34.1801 15.4664L31.8248 14.1365L29.4693 15.4664C29.305 15.5591 29.1175 15.6027 28.9291 15.5918C28.7408 15.581 28.5595 15.5163 28.4068 15.4054C28.2542 15.2945 28.1367 15.142 28.0682 14.9662C27.9998 14.7904 27.9833 14.5986 28.0207 14.4136L28.557 11.7626L26.5651 9.93327C26.426 9.80567 26.3266 9.6408 26.2786 9.45829C26.2306 9.27579 26.2361 9.08333 26.2944 8.90385C26.3527 8.72437 26.4614 8.56544 26.6075 8.44597C26.7536 8.32651 26.9309 8.25155 27.1184 8.23003L29.8049 7.92085L30.9292 5.46217C31.0073 5.29021 31.1332 5.14439 31.292 5.04212C31.4508 4.93984 31.6356 4.88546 31.8245 4.88546C32.0133 4.88546 32.1982 4.93984 32.3569 5.04212C32.5157 5.14439 32.6416 5.29021 32.7197 5.46217L33.8441 7.92085L36.5307 8.23003C36.7182 8.25173 36.8955 8.32684 37.0415 8.44643C37.1875 8.56602 37.2961 8.72505 37.3543 8.90458H37.3546ZM25.6275 5.21467C25.5692 5.03494 25.4606 4.87567 25.3146 4.75566C25.1686 4.63565 24.9914 4.55992 24.8037 4.53741L21.3441 4.14267L19.8966 0.972771C19.8176 0.80177 19.6913 0.656958 19.5327 0.55546C19.374 0.453963 19.1896 0.400024 19.0012 0.400024C18.8129 0.400024 18.6285 0.453963 18.4698 0.55546C18.3111 0.656958 18.1848 0.80177 18.1059 0.972771L16.6582 4.14243L13.1987 4.53717C13.0113 4.55915 12.8342 4.63442 12.6884 4.75403C12.5425 4.87365 12.434 5.0326 12.3758 5.21202C12.3175 5.39144 12.3119 5.5838 12.3597 5.76629C12.4075 5.94877 12.5067 6.11372 12.6454 6.24156L15.2102 8.5977L14.5197 12.0102C14.4823 12.1951 14.4989 12.3869 14.5674 12.5626C14.6359 12.7384 14.7534 12.8907 14.906 13.0016C15.0587 13.1124 15.2399 13.1771 15.4282 13.1879C15.6165 13.1987 15.804 13.1552 15.9683 13.0625L19.0012 11.3517L22.0341 13.0626C22.1984 13.1553 22.3858 13.1988 22.5741 13.188C22.7624 13.1772 22.9436 13.1125 23.0962 13.0017C23.2488 12.8908 23.3664 12.7385 23.4349 12.5627C23.5034 12.387 23.5199 12.1953 23.4826 12.0104L22.7922 8.59786L25.3571 6.24156C25.4959 6.11431 25.5952 5.94984 25.6432 5.76774C25.6912 5.58563 25.6858 5.39357 25.6278 5.21443L25.6275 5.21467ZM11.663 25.5825C11.4897 25.3069 11.2493 25.0797 10.9643 24.9222C10.6793 24.7647 10.3591 24.682 10.0335 24.6819H3.23887C2.7281 24.6824 2.23836 24.8854 1.87714 25.2465C1.51591 25.6077 1.3127 26.0973 1.31209 26.6081V40.4723C1.31252 40.9832 1.51563 41.4732 1.87685 41.8346C2.23807 42.196 2.7279 42.3993 3.23887 42.4H10.0335C10.359 42.3998 10.6792 42.3172 10.9641 42.1598C11.2491 42.0025 11.4895 41.7755 11.663 41.5V25.5825ZM3.80186 28.2978C3.80186 28.0367 3.90557 27.7863 4.09018 27.6017C4.27479 27.4171 4.52517 27.3134 4.78625 27.3134H5.50871C5.76979 27.3134 6.02017 27.4171 6.20478 27.6017C6.38939 27.7863 6.4931 28.0367 6.4931 28.2978C6.4931 28.5589 6.38939 28.8093 6.20478 28.9939C6.02017 29.1785 5.76979 29.2822 5.50871 29.2822H4.78633C4.65705 29.2822 4.52904 29.2568 4.4096 29.2073C4.29016 29.1578 4.18163 29.0853 4.09021 28.9939C3.99879 28.9025 3.92628 28.794 3.8768 28.6745C3.82732 28.5551 3.80186 28.4271 3.80186 28.2978Z"
                      fill="#14A077"
                    />
                  </svg>
                </span>
              </div>
              <div className="content style3">
              <h3>{contJobHires}</h3>
                <h4 className="title-count">Hires</h4>
              </div>
            </div> */}
            {/* <div className="box-icon wrap-counter flex" onClick={interviews}>
              <div className="icon style4">
                <span className="icon-bag">
                  <svg
                    width={36}
                    height={48}
                    viewBox="0 0 36 48"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M34.3496 0H2.34998C1.92564 0 1.51868 0.168569 1.21862 0.468623C0.918569 0.768678 0.75 1.17564 0.75 1.59998V46.3994C0.749887 46.7009 0.834958 46.9963 0.99541 47.2515C1.15586 47.5068 1.38517 47.7115 1.6569 47.8421C1.92863 47.9727 2.23173 48.0239 2.53128 47.9897C2.83082 47.9555 3.11462 47.8374 3.34997 47.649L18.3498 35.6476L33.3496 47.6474C33.5848 47.8357 33.8685 47.9538 34.1679 47.9881C34.4673 48.0223 34.7703 47.9712 35.0419 47.8408C35.3136 47.7104 35.5429 47.506 35.7035 47.2509C35.8641 46.9959 35.9494 46.7008 35.9496 46.3994V1.59998C35.9496 1.17564 35.781 0.768678 35.4809 0.468623C35.1809 0.168569 34.7739 0 34.3496 0Z"
                      fill="#FFB321"
                    />
                  </svg>
                </span>
              </div>
              <div className="content">
              <h3> {countInterviews}</h3>
              <h4
        className="title-count"
        onClick={interviews}
        style={{ cursor: "pointer" }}
      >
        Interviews
      </h4>
                
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
    {/*New Change In the Dash Board*/}
    <div className="box-icon1 wrap-counter" style={{ display: "flex", alignItems: "center" }} onClick={Postajob}>
      
    <div>
    <h2 className="heading">Find the right candidate</h2>

        <div className="">
            <span className=""></span>
        </div>
        <div className="content">
           
            <h4 className="title-count1" style={{paddingRight:"80px",color: "#8D8D8D"}}>
            Get access to certified entry-level candidates for your hiring requirements.
            </h4>
            
        </div>
        
        <Link
  to="/recruiter-postjob"
  className={`button-link ${location.pathname === "/recruiter-postjob" ? "tf-effect active" : ""}`}
>
            <span className=""></span>
            <span className="button button-custom">Post <span className="lowercase">a</span> Job</span>

        </Link>
    </div>
    
    <img 
  src={Postjobimg}
  alt="Post Job Image"
  className='Post-Job-Image'
  width="200"
  height="300"
/>
</div>


  </section>
  {/* <section className="flat-dashboard-applicants">
        <div className="themes-container">
          <div className="row">
            <div className="col-lg-12 col-md-12">
              <div className="applicants bg-white">
                <h3 className="title-appli">Today Interviews</h3>
                <div className="table-content">
                {todayApplicants.length > 0 ? (
                  <div className="wrap-applicants table-container-wrapper">
                    <table className="table-responsive">
                      <thead>
                        <tr>
                          <th>Candidates</th>
                          <th>Job Title</th>
                          <th>Interview Date and Time</th>
                          <th>Location</th>
                          
                        </tr>
                      </thead>
                      <tbody>
                        {todayApplicants.map((interview) => (
                          <tr key={interview.id} className="file-delete">
                            <td style={{ paddingBottom: '10px' }}>
                                 {interview.name}
                          
                            </td>
                            <td style={{ paddingBottom: '10px' }}> <h6>{interview.jobTitle}</h6></td>
                            <td>{formatDateTime(interview.timeAndDate)}</td>
                            <td className="map color-4">{interview.location}</td>
                            
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ): (
                  <p align="center">No today interviews are available.</p>
                )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}
      <br />
  {/* <section className="flat-dashboard-applicants">
        <div className="themes-container">
          <div className="row">
            <div className="col-lg-12 col-md-12">
              <div className="applicants bg-white">
                <h3 className="title-appli">Upcoming Interviews</h3>
                <div className="table-content">
                {applicants.length > 0 ? (
                  <div className="wrap-applicants table-container-wrapper">
                    <table className="table-responsive">
                      <thead>
                        <tr>
                          <th>Candidates</th>
                          <th>Job Title</th>
                          <th>Interview Date and Time</th>
                          <th>Location</th>
                          
                        </tr>
                      </thead>
                      <tbody>
                        {applicants.map((interview) => (
                          <tr key={interview.id} className="file-delete">
                            <td>
                                 {interview.name}
                          
                            </td>
                            <td> <h6>{interview.jobTitle}</h6></td>
                            <td>{formatDateTime(interview.timeAndDate)}</td>
                            <td className="map color-4">{interview.location}</td>

                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                              ) : (
                                <p align="center">No upcoming interviews are available.</p>
                              )}
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}
<br />
</div>




    </div>
  )
}

export default RecruiterDashboard;
function formatDateTime(dateTimeArray) {
  const [year, month, day, hour, minute] = dateTimeArray;
  const formattedDate = new Date(year, month - 1, day).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
  const formattedTime = new Date(year, month - 1, day, hour, minute).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });
 
  return `${formattedDate} ${formattedTime}`;
}