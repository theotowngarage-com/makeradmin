import { render } from "preact";
import * as common from "./common";
import { ServerResponse, UNAUTHORIZED } from "./common";
import * as login from "./login";
import { Quiz } from "./quiz";
import { Sidebar } from "./sidebar";
declare var UIkit: any;

interface QuizInfo {
    quiz: Quiz;
    total_questions_in_quiz: number;
    correctly_answered_questions: number;
}

const CourseButton = ({ quizInfo }: { quizInfo: QuizInfo }) => {
    const completed =
        quizInfo.correctly_answered_questions >=
        quizInfo.total_questions_in_quiz;

    let actionBtn;
    if (completed) {
        actionBtn = (
            <div class="course-completed">
                Completed <span uk-icon="icon: check; ratio: 1.5" />
            </div>
        );
    } else if (quizInfo.correctly_answered_questions > 0) {
        const completed_fraction =
            quizInfo.correctly_answered_questions /
            quizInfo.total_questions_in_quiz;
        actionBtn = (
            <div class="course-not-completed">
                Continue ({Math.round(completed_fraction * 100)}%){" "}
                <span uk-icon="icon: chevron-right; ratio: 1.5"></span>
            </div>
        );
    } else {
        actionBtn = (
            <div class="course-not-completed">
                Take the course{" "}
                <span uk-icon="icon: chevron-right; ratio: 1.5"></span>
            </div>
        );
    }
    return (
        <a
            href={`/member/quiz/${quizInfo.quiz.id}`}
            className={`course-item ${
                completed ? "course-item-completed" : ""
            }`}
        >
            <span>{quizInfo.quiz.name}</span>
            {actionBtn}
        </a>
    );
};

const CoursesPage = ({ courses }: { courses: QuizInfo[] }) => {
    return (
        <>
            <Sidebar cart={null} />
            <div id="content">
                <div class="content-centering courses-page">
                    <h2>Courses</h2>
                    <p>
                        Here you can find all the online courses from The O'Town
                        Garage.
                    </p>
                    <div>
                        {courses.map((quizInfo) => (
                            <CourseButton quizInfo={quizInfo} />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

common.documentLoaded().then(() => {
    common.addSidebarListeners();

    const apiBasePath = window.apiBasePath;

    const future1 = common.ajax(
        "GET",
        apiBasePath + "/member/current/quizzes",
        null,
    );

    const rootElement = document.querySelector("#root") as HTMLElement;
    rootElement.innerHTML = "";

    future1
        .then((quizzesJson: ServerResponse<QuizInfo[]>) => {
            rootElement.innerHTML = "";
            render(<CoursesPage courses={quizzesJson.data} />, rootElement);
        })
        .catch((json) => {
            // Probably Unauthorized, redirect to login page.
            if (json.status === UNAUTHORIZED) {
                // Render login
                login.render_login(rootElement, null, null);
            } else {
                UIkit.modal.alert(
                    "<h2>Failed to retrieve the quiz info</h2>" +
                        common.get_error(json),
                );
            }
        });
});
