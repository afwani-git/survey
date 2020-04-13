import React from "react";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";

import InputMaterial from "./InputMaterial.component";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const FormDialog = ({ isOpen, handleClose, handelSubmit }) => {
	const formSchema = Yup.object().shape({
		title: Yup.string()
			.min(3, "Too Short!")
			.required("Required"),
		subject: Yup.string().required("Required"),
		body: Yup.string().required("Required"),
		recipients: Yup.string().required("Required")
	});

	return (
		<div>
			<Dialog
				open={isOpen}
				onClose={handleClose}
				aria-labelledby="form-dialog-title"
			>
				<DialogTitle id="form-dialog-title">Adds new surveys</DialogTitle>
				<DialogContent>
					<DialogContentText>
						Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque esse
						alias quisquam debitis, et qui quae delectus. Facilis voluptatibus
						quam ad atque neque quidem, praesentium, dolorum accusamus qui harum
						quasi.
					</DialogContentText>

					<Formik
						initialValues={{ title: "", subject: "", body: "", recipients: "" }}
						onSubmit={(values, action) => {
							handelSubmit(values);
						}}
						validationSchema={formSchema}
					>
						{({ errors, touched }) => {
							return (
								<Form>
									<Field
										component={InputMaterial}
										error={errors.title}
										autoFocus
										margin="dense"
										name="title"
										label="Surveys title"
										type="text"
										fullWidth
										helperText={errors.title}
									/>

									<Field
										component={InputMaterial}
										error={errors.subject}
										margin="dense"
										name="subject"
										label="Subject line"
										type="text"
										fullWidth
										helperText={errors.subject}
									/>

									<Field
										component={InputMaterial}
										error={errors.body}
										margin="dense"
										name="body"
										label="Body"
										type="text"
										helperText={errors.body}
										fullWidth
									/>

									<Field
										component={InputMaterial}
										error={errors.recipients}
										margin="dense"
										name="recipients"
										label="Recipients"
										type="text"
										helperText={errors.recipients}
										fullWidth
									/>
									<DialogActions>
										<Button onClick={handleClose} color="primary">
											Cancel
										</Button>
										<Button type="submit" color="primary">
											submit
										</Button>
									</DialogActions>
								</Form>
							);
						}}
					</Formik>
				</DialogContent>
			</Dialog>
		</div>
	);
};

export default FormDialog;
