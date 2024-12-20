import * as React from "react";
import { extendTheme, styled } from "@mui/material/styles";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AssignmentIcon from "@mui/icons-material/Assignment";
import SchoolIcon from "@mui/icons-material/School";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { PageContainer } from "@toolpad/core/PageContainer";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import DashboardContent from "./features/DashboardContent";
import { BACKEND_URL } from "../../../../globals";
import { useRecoilState } from "recoil";
import { studentAtom } from "../../../../recoil/atoms/studentAtom";
import { QuizContent } from "./features/quiz/QuizContent";
import BarChartIcon from "@mui/icons-material/BarChart";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import axios from "axios";
import { studentClassAtom } from "../../../../recoil/atoms/classAtom";
import { Classes } from "./features/class/Classes";
import { Assignment } from "./features/assignment/Assignment";
import { Marks } from "./features/marks/Marks";
import ProfileContent from "./ProfileContent";
import { Attendance } from "./features/attendance/Attendance";

const NAVIGATION = [
  {
    kind: "header",
    title: "Main items",
  },
  {
    segment: "student/dashboard",
    title: "Dashboard",
    icon: <DashboardIcon />,
  },
  {
    segment: "student/grades",
    title: "Grades",
    icon: <SchoolIcon />,
  },
  {
    segment: "student/attendance",
    title: "Attendance",
    icon: <AssignmentIcon />,
  },
  {
    segment: "student/quiz",
    title: "Quiz",
    icon: <BarChartIcon />,
  },
  {
    segment: "student/assignments",
    title: "Assignments",
    icon: <AssignmentIcon />,
  },
  {
    kind: "divider",
  },
  {
    kind: "header",
    title: "Resources",
  },
  {
    segment: "student/class",
    title: "Classes",
    icon: <PeopleAltIcon />,
  },
  {
    kind: "divider",
  },
  {
    kind: "header",
    title: "Profile",
  },
  {
    segment: "student/profile",
    title: "Profile",
    icon: <AccountCircleIcon />,
  },
  {
    segment: "student/logout",
    title: "Log Out",
    icon: <LogoutIcon />,
    onclick: () => {
      localStorage.setItem("token", "");
    },
  },
];

const demoTheme = extendTheme({
  colorSchemes: { light: true, dark: true },
  colorSchemeSelector: "class",
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

function useDemoRouter(initialPath) {
  const [pathname, setPathname] = React.useState(initialPath);
  const router = React.useMemo(
    () => ({
      pathname,
      searchParams: new URLSearchParams(),
      navigate: (path) => setPathname(String(path)),
    }),
    [pathname]
  );

  return router;
}

const Skeleton = styled("div")(({ theme, height }) => ({
  backgroundColor: theme.palette.action.hover,
  borderRadius: theme.shape.borderRadius,
  height,
  content: '" "',
}));

export default function StudentDashboard(props) {
  const [student, setStudent] = useRecoilState(studentAtom);
  const [loading, setLoading] = React.useState(true);
  const [courses, setCourses] = useRecoilState(studentClassAtom);
  const navigate = useNavigate();
  const { window } = props;
  const router = useDemoRouter("/student/dashboard");
  const demoWindow = window ? window() : undefined;

  React.useEffect(() => {
    if (
      ![
        "/student/dashboard",
        "/student/grades",
        "/student/attendance",
        "/student/assignments",
        "/student/quiz",
        "/student/profile",
        "/student/logout",
        "/student/class",
      ].includes(router.pathname)
    ) {
      router.navigate("/student/dashboard");
    }
  }, [router]);

  React.useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await fetch(`${BACKEND_URL}/authoriseuser`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            role: "student",
          },
        });
        const data = await res.json();
        // console.log("dashboard" + data);
        setStudent(data.User);
      } catch (err) {
        setStudent(null);
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  React.useEffect(() => {
    if (!loading && (student === undefined || !student)) {
      navigate("/signin/student");
    }
  }, [student, navigate, loading]);

  const renderPageContent = React.useCallback(() => {
    switch (router.pathname) {
      case "/student/dashboard":
        return <DashboardContent />;
      case "/student/grades":
        return <Marks />;
      case "/student/attendance":
        return <Attendance />;
      case "/student/assignments":
        return <Assignment />;
      case "/student/quiz":
        return <QuizContent />;
      case "/student/class":
        return <Classes />;
      case "/student/profile":
        return <ProfileContent />;
      case "/student/logout":
        localStorage.setItem("token", "");
        return navigate("/signinoptions");
      default:
        return <h1>Welcome to Student Dashboard</h1>;
    }
  }, [router.pathname]);

  return (
    <AppProvider
      navigation={NAVIGATION}
      router={router}
      theme={demoTheme}
      branding={{ title: "Atria IT Student Portal" }}
      window={demoWindow}
    >
      <DashboardLayout
        sx={{
          overflow: "hidden",
          maxWidth: "100%",
          whiteSpace: "nowrap",
          position: "relative",
        }}
      >
        <PageContainer>{renderPageContent()}</PageContainer>
      </DashboardLayout>
    </AppProvider>
  );
}
