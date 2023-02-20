const APIVerifier = async (req: any, res: any, next: any) => {
  const header: any = req.headers;
  const convrsTestKey = header["convrs-test-key"] as string;
  const CONVRSTESTKEY = process.env.CONVRS_TEST_KEY as
    | string
    | null
    | undefined;

  if (convrsTestKey === CONVRSTESTKEY) next();
  else return res.status(401).send("Unidentified API Key/Secretkey!");
};

export default APIVerifier;
