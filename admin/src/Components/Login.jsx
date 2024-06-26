import React from "react";
import { Link } from "react-router-dom";
import auth from "../auth";
import { showError } from "../message";

export default class Login extends React.Component {
    login(e) {
        e.preventDefault();
        const username = this.username.value;
        const password = this.password.value;

        if (!username || !password) {
            showError("You must enter email/medlemsnummer och password");
            return;
        }

        auth.login(username, password);
    }

    render() {
        return (
            <div className="uk-vertical-align uk-text-center uk-height-1-1">
                <div
                    className="uk-vertical-align-middle"
                    style={{ width: "300px" }}
                >
                    <form
                        className="uk-panel uk-panel-box uk-form"
                        onSubmit={this.login.bind(this)}
                    >
                        <div className="uk-form-row">
                            <h2>log in</h2>
                        </div>

                        <div className="uk-form-row">
                            <div className="uk-form-icon">
                                <i className="uk-icon-user" />
                                <input
                                    ref={(c) => {
                                        this.username = c;
                                    }}
                                    className="uk-form-large uk-form-width-large"
                                    type="text"
                                    placeholder="Email/Medlemsnummer"
                                />
                            </div>
                        </div>

                        <div className="uk-form-row">
                            <div className="uk-form-icon">
                                <i className="uk-icon-lock" />
                                <input
                                    ref={(c) => {
                                        this.password = c;
                                    }}
                                    className="uk-form-large uk-form-width-large"
                                    type="password"
                                    placeholder="Password"
                                />
                            </div>
                        </div>

                        <div className="uk-form-row">
                            <button
                                type="submit"
                                className="uk-width-1-1 uk-button uk-button-primary uk-button-large"
                            >
                                log in
                            </button>
                        </div>

                        <div className="uk-form-row uk-text-small">
                            <Link
                                className="uk-float-right uk-link uk-link-muted"
                                to="/request-password-reset"
                            >
                                Glömt your password?
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}
