use anchor_lang::prelude::*;

#[error_code]
pub enum ErrorCode {
    #[msg("Poll counter cannot be less than zero")]
    PollCounterUnderflow,
    #[msg("Voter cannot vote twice")]
    VoterAlreadyVoted,
    #[msg("Candidate cannot register twice")]
    CandidateAlreadyRegistered,
    #[msg("Start date cannot be greater than end date")]
    InvalidDates,
    #[msg("Candidate is not in the poll")]
    CandidateNotRegistered,
    #[msg("Poll not currently active")]
    PollNotActive,
    #[msg("Poll does not exist or not found")]
    PollDoesNotExist,
}
