import { useContext } from "react";
import { Toast, ToastContainer } from "react-bootstrap";
import { SystemContext } from "../../contexts/SystemContext";

const HIDE_IN_MS = 2500;

export default function Alert() {
    //CONTEXTS
    const { alerts } = useContext(SystemContext);

    return (
        <div aria-live="polite" aria-atomic="true" className="bg-dark position-relative">
            {alerts.map((alert) => (
                <ToastContainer key={alert.id} position="top-end" className="p-3">
                    <Toast show={alert.show} onClose={alert.hide} autohide delay={HIDE_IN_MS}>
                        <Toast.Header>
                            <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
                            <strong className="me-auto">Alerta</strong>
                            <small className="text-muted">
                                <i className="bi bi-clock me-1" />
                                {alert.dateTime.toLocaleTimeString("pt-Br", {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                    second: "2-digit",
                                })}
                            </small>
                        </Toast.Header>
                        <Toast.Body className="text-dark">{alert.message}</Toast.Body>
                    </Toast>
                </ToastContainer>
            ))}
        </div>
    );
}
