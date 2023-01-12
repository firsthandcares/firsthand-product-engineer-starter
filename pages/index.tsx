import { GetServerSideProps } from 'next';
import React from 'react';
import { PrintDashboard } from '../components/dashboard/print-dashboard';
import { fetchPatients } from './api/v1/patient';

interface IRenderProps {
  email: string;
  patients: any;
}

const Homepage = (props: IRenderProps) => (
  <PrintDashboard email={props.email} patients={props.patients} />
);

// eslint-disable-next-line
export const getServerSideProps: GetServerSideProps<IRenderProps> = async () => {
  const patients = fetchPatients();

  return {
    props: {
      email: 'test@firsthandcares.com',
      patients,
    },
  };
};

export default Homepage;
