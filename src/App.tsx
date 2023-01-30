import React, { Fragment } from "react";
import "./App.modules.css";
import Brand from "./components/navbar/Brand";
import Card from "./components/Card/Card";
import CardBody from "./components/Card/CardBody";
import Container from "./components/Container";
import FlatButton from "./components/button/FlatButton";
import Modal from "./components/modal/Modal";
import ModalBody from "./components/modal/ModalBody";
import ModalHeader from "./components/modal/ModalHeader";
import NavBar from "./components/navbar/NavBar";
import TextField from "./components/TextField";
import Note from "./model/note";
import ModalFooter from "./components/modal/ModalFooter";
import TextAreaField from "./components/TextAreaField";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import NoteLocalStorage from "./db/note-local-storage";
import OutlineButton from "./components/button/OutlineButton";

type state = {
    show: boolean;
    note: Note;
    notes: Note[];
};
class App extends React.Component<{}, state> {
    constructor(props: {}) {
        super(props);
        this.state = {
            show: false,
            note: new Note(0, "", ""),
            notes: [],
        };
    }

    componentDidMount(): void {
        const notes = new NoteLocalStorage().fetchAll();
        this.setState({
            notes,
        });
    }

    handlerClose = () => {
        if (this.state.note.title === "" || this.state.note.text === "") {
            console.log("empty");
            this.setState({
                show: false,
            });
            return;
        }
        const db: NoteLocalStorage = new NoteLocalStorage();
        console.log("pre save");
        if (this.state.note.id > 0) {
            db.update(this.state.note);
        } else {
            db.add(this.state.note);
        }
        let notes: Note[] = db.fetchAll();
        this.setState({ show: false, note: new Note(0, "", ""), notes: notes });
    };

    handlerAddCard = () => {
        this.setState({
            show: true,
            note: new Note(0, ""),
        });
    };

    handlerClickCard = (note: Note) => {
        this.setState({
            show: true,
            note: new Note(note.id, note.title, note.text),
        });
    };

    handlerDelete = () => {
        const db: NoteLocalStorage = new NoteLocalStorage();
        db.deleteById(this.state.note.id);
        const notes: Note[] = db.fetchAll();
        this.setState({
            note: new Note(0, ""),
            notes: notes,
            show: false,
        });
    };

    render() {
        return (
            <div className="App">
                <NavBar>
                    <Container>
                        <Brand href="/" text="Note" />
                    </Container>
                </NavBar>
                <Container>
                    <div className="row my-3">
                        <div className="col">
                            <div className=" float-end">
                                <FlatButton
                                    onclick={this.handlerAddCard}
                                    color="warning"
                                    value="Add note"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 mx-1">
                        <Fragment>
                            {this.state.notes.map((note: Note) => {
                                console.log(note);
                                return (
                                    <div className="col mb-2" key={note.id}>
                                        <Card
                                            onClick={() =>
                                                this.handlerClickCard(note)
                                            }
                                        >
                                            <CardBody>
                                                <h2 className="text-start">
                                                    {note.title}
                                                </h2>
                                                <div
                                                    style={{
                                                        minHeight: "230px",
                                                    }}
                                                >
                                                    <p className="text-start text-overflow">
                                                        {note.text}
                                                    </p>
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </div>
                                );
                            })}
                            <Modal show={this.state.show}>
                                <ModalHeader>
                                    <TextField
                                        value={this.state.note.title}
                                        onChange={(text: string) => {
                                            const note = this.state.note;
                                            note.title = text;
                                            this.setState({
                                                note,
                                            });
                                        }}
                                    />
                                    <button
                                        type="button"
                                        className="btn-close"
                                        onClick={this.handlerClose}
                                        data-bs-dismiss="modal"
                                        aria-label="Close"
                                    />
                                </ModalHeader>
                                <ModalBody>
                                    <TextAreaField
                                        value={this.state.note.text}
                                        onChange={(text: string) => {
                                            const note = this.state.note;
                                            note.text = text;
                                            this.setState({
                                                note,
                                            });
                                        }}
                                        placeHolder="Enter text"
                                    ></TextAreaField>
                                </ModalBody>
                                <ModalFooter>
                                    <OutlineButton
                                        color="warning"
                                        value="Delete"
                                        onclick={this.handlerDelete}
                                    />
                                    <FlatButton
                                        color="warning"
                                        value="close"
                                        onclick={this.handlerClose}
                                    />
                                </ModalFooter>
                            </Modal>
                        </Fragment>
                    </div>
                </Container>
            </div>
        );
    }
}

export default App;
