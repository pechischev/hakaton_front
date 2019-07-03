import * as React from "react";
import {FC} from "react";
import {Button, Grid} from "@material-ui/core";
import {CustomForm} from "../../components/custom-form";
import {InputField} from "../../components/fields";
import {appHistory} from "../../App";
import {UserContext} from "../../connector/AppContext";

export const Login: FC = () => {
    return (
        <Grid container style={{height: "100%"}}>
            <CustomForm
                validateData={() => ([
                    {type: "user", codes: []},
                    {type: "password", codes: []},
                ])}
                submit={(data) => {
                    localStorage.setItem("user", JSON.stringify(data));
                    appHistory.push("/");
                    UserContext().login();
                }}
                render={(api, submitting) => (
                    <Grid container
                          style={{
                              position: "relative",
                              margin: "auto",
                              maxWidth: 500,
                              padding: 20
                          }}
                          direction={"column"}
                    >

                        <Grid item>
                            <InputField label={"Email или логин"} name={"user"}/>
                        </Grid>
                        <Grid item>
                            <InputField label={"Пароль"} type={"password"} name={"password"}/>
                        </Grid>
                        <Grid item style={{margin: "auto", marginTop: 10}}>
                            <Button onClick={() => api.handleSubmit()}
                                    className={`btn ${submitting ? "" : "disabled"}`}>Войти</Button>
                        </Grid>
                    </Grid>
                )}
            />
        </Grid>
    );
};