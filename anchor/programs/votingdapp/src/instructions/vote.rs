use crate::constants::ANCHOR_DISCRIMINATOR_SIZE;
use crate::errors::ErrorCode::*;
use crate::states::*;
use anchor_lang::prelude::*;

pub fn vote(ctx: Context<Vote>, poll_id: u64, cid: u64) -> Result<()> {
    let voter = &mut ctx.accounts.voter;
    let candidate = &mut ctx.accounts.candidate;
    let poll = &mut ctx.accounts.poll;

    if !candidate.has_registered || candidate.poll_id != poll_id {
        return Err(CandidateNotRegistered.into());
    }

    if voter.has_voted {
        return Err(VoterAlreadyVoted.into());
    }

    let current_timestamp = Clock::get()?.unix_timestamp as u64;
    if current_timestamp < poll.start || current_timestamp > poll.end {
        return Err(PollNotActive.into());
    }

    voter.poll_id = poll_id;
    voter.cid = cid;
    voter.has_voted = true;

    candidate.votes += 1;

    Ok(())
}

#[derive(Accounts)]
#[instruction(poll_id: u64, cid: u64)]
pub struct Vote<'info> {
    #[account(
        mut,
        seeds = [poll_id.to_le_bytes().as_ref()],
        bump
    )]
    pub poll: Account<'info, Poll>, // Poll to be voted in

    #[account(
        mut,
        seeds = [poll_id.to_le_bytes().as_ref(), cid.to_le_bytes().as_ref()],
        bump
    )]
    pub candidate: Account<'info, Candidate>, // Candidate to receive the vote

    #[account(
        init, // Create the voter account if it doesn't exist
        payer = user,
        space = ANCHOR_DISCRIMINATOR_SIZE + 25, // Account size
        seeds = [b"voter", poll_id.to_le_bytes().as_ref(), user.key().as_ref()],
        bump
    )]
    pub voter: Account<'info, Voter>, // Unique per poll and user

    #[account(mut)]
    pub user: Signer<'info>, // Voter's signer account

    pub system_program: Program<'info, System>,
}
