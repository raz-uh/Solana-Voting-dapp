use crate::constants::ANCHOR_DISCRIMINATOR_SIZE;
use crate::errors::ErrorCode::InvalidDates;
use crate::states::*;
use anchor_lang::prelude::*;

pub fn create_poll(
    ctx: Context<CreatePoll>,
    description: String,
    start: u64,
    end: u64,
) -> Result<()> {
    if start >= end {
        return Err(InvalidDates.into());
    }

    let counter = &mut ctx.accounts.counter;
    counter.count += 1;

    let poll = &mut ctx.accounts.poll;
    poll.id = counter.count;
    poll.description = description;
    poll.start = start;
    poll.end = end;
    poll.candidates = 0;

    Ok(())
}

#[derive(Accounts)]
pub struct CreatePoll<'info> {
    #[account(mut)]
    pub user: Signer<'info>,

    #[account(
        init,
        payer = user,
        space = ANCHOR_DISCRIMINATOR_SIZE + Poll::INIT_SPACE,
        seeds = [(counter.count + 1).to_le_bytes().as_ref()],
        bump
    )]
    pub poll: Account<'info, Poll>,

    #[account(
        mut,
        seeds = [b"counter"],
        bump
    )]
    pub counter: Account<'info, Counter>,

    pub system_program: Program<'info, System>,
}
