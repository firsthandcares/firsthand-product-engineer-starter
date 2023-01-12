import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import React from "react";
import ErrorBoundaryComponent from "../error-tracking/error-boundary";

type EngagementStatus =
  | "Contact made, not yet engaged"
  | "Engaged"
  | "Unable to reach"
  | "Pre-Engagement Disenrollment"
  | "Opt out / Hard decline"
  | "Unable to reach (poor contact information)"
  | "Contact made, not yet engaged";

export interface IPrintPatient {
  MRN: string;
  ASSIGN_DATE: string; // '2023-01-09';
  FIRST_NAME: string;
  LAST_NAME: string;
  BIRTHDATE: string; // '2002-05-12';
  CURRENT_ADDRESS_LINE_1: string; // '500 Hogwards WAY APT 5';
  CURRENT_ADDRESS_LINE_2: string;
  CURRENT_CITY: string; // 'KNOXVILLE';
  CURRENT_ZIP5: string; // '37920';
  PHONENUMBER: string; // '12323983247';
  MOST_RECENT_PLAN_PRODUCT_DESC: string; // 'Medicare - Dual Eligible';
  MOST_RECENT_ENGAGE_STATUS: EngagementStatus | null;
  OUTREACH_ATTEMPT: string | null; // '2023-01-09';
  LAST_SUCCESSFUL: string | null; // '2023-01-09';
  CONSENTTOTREAT_EFFECTIVE_DATE: string | null;
  CURRENTLY_ASSIGNED_CRG_FIRST_NAME: string | null;
  CRGVISIT: string | null;
  CURRENTLY_ASSIGNED_HG_FIRST_NAME: string | null;
  HGVISIT: string | null;
  POMDATE: string | null;
  FIRSTPOM_SCORE: number | null;
}

const PREFIX = "PatientRow";

const classes = {
  container: `${PREFIX}-container`,
  notes: `${PREFIX}-notes`,
};

const PatientRowContainer = styled("div")(({ theme }) => ({
  [`& .${classes.container}`]: {
    marginBottom: theme.spacing(2),
    "&:last-child": {
      marginBottom: 0,
    },
  },
  [`& .${classes.notes}`]: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(0.5),
  },
}));

const formatPhoneNumber = (phoneNumberString: string) => {
  const cleaned = phoneNumberString.replace(/\D/g, "");
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return "(" + match[1] + ") " + match[2] + "-" + match[3];
  }
  return null;
};

const PatientRow = (props: { patient: IPrintPatient }) => (
  <div className={classes.container}>
    <Grid container alignItems="flex-start" spacing={2}>
      <Grid item xs={4}>
        <Typography>
          {props.patient.FIRST_NAME} {props.patient.LAST_NAME}
        </Typography>
        {props.patient.MOST_RECENT_ENGAGE_STATUS && (
          <Typography variant="subtitle1">
            {props.patient.MOST_RECENT_ENGAGE_STATUS}
          </Typography>
        )}
      </Grid>
      <Grid item xs={4}>
        <Typography variant="subtitle1">
          {[
            props.patient.CURRENT_ADDRESS_LINE_1,
            props.patient.CURRENT_ADDRESS_LINE_2,
          ]
            .filter(Boolean)
            .join(" ")
            .trim()}
          , {props.patient.CURRENT_CITY} {props.patient.CURRENT_ZIP5}
        </Typography>
        {props.patient.OUTREACH_ATTEMPT && (
          <Typography variant="subtitle1">
            <b>Last outreach attempt</b>{" "}
            {new Date(props.patient.OUTREACH_ATTEMPT).toLocaleDateString()}
          </Typography>
        )}
      </Grid>
      <Grid item xs={4} style={{ textAlign: "right" }}>
        {props.patient.PHONENUMBER && (
          <Typography variant="subtitle1">
            {formatPhoneNumber(props.patient.PHONENUMBER)}
          </Typography>
        )}
        {props.patient.LAST_SUCCESSFUL && (
          <Typography variant="subtitle1">
            <b>Last outreach</b>{" "}
            {new Date(props.patient.LAST_SUCCESSFUL).toLocaleDateString()}
          </Typography>
        )}
      </Grid>
    </Grid>
    <div className={classes.notes}>
      <Typography variant="subtitle2">Notes</Typography>
    </div>
  </div>
);

export const PrintDashboard = (props: { email: string; patients: any[] }) => {
  const patients: IPrintPatient[] = props.patients.map((patient) => ({
    ...patient,
    HGVISIT: patient.HGVISIT === "NULL" ? null : patient.HGVISIT,
    CRGVISIT: patient.CRGVISIT === "NULL" ? null : patient.CRGVISIT,
    POMDATE: patient.POMDATE === "NULL" ? null : patient.POMDATE,
    OUTREACH_ATTEMPT:
      patient.POMDATE === "NULL" ? null : patient.OUTREACH_ATTEMPT,
    LAST_SUCCESSFUL:
      patient.LAST_SUCCESSFUL === "NULL" ? null : patient.LAST_SUCCESSFUL,
    CONSENTTOTREAT_EFFECTIVE_DATE:
      patient.CONSENTTOTREAT_EFFECTIVE_DATE === "NULL"
        ? null
        : patient.CONSENTTOTREAT_EFFECTIVE_DATE,
  }));

  const engagedPatients = patients.filter(
    (p) => p.MOST_RECENT_ENGAGE_STATUS === "Engaged"
  );
  const notYetEngaged = patients.filter(
    (p) => p.MOST_RECENT_ENGAGE_STATUS !== "Engaged"
  );

  return (
    <ErrorBoundaryComponent>
      <Container maxWidth="lg">
        <PatientRowContainer>
          <div style={{ pageBreakAfter: "always" }}>
            <Typography variant="h4">Engaged</Typography>
            <Divider />
            <br />
            {engagedPatients.map((p) => (
              <PatientRow patient={p} key={p.MRN} />
            ))}
          </div>
          <Typography variant="h4">Not engaged</Typography>
          <Divider />
          <br />
          {notYetEngaged.map((p) => (
            <PatientRow patient={p} key={p.MRN} />
          ))}
        </PatientRowContainer>
        <footer>
          <Grid container justifyContent="space-between">
            <Grid item xs>
              <Typography variant="subtitle2">
                Private property of {props.email} (844) 378-4263
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="subtitle2">
                Printed {new Date().toLocaleDateString()}
              </Typography>
            </Grid>
          </Grid>
        </footer>
      </Container>
    </ErrorBoundaryComponent>
  );
};
